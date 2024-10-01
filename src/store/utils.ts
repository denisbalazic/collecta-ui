import {fetchBaseQuery, TagDescription} from '@reduxjs/toolkit/query/react';
import {Mutex} from 'async-mutex';
import {BaseQueryApi} from '@reduxjs/toolkit/query';
import {API_HOST} from '../config';
import {getLocalAccessToken, getLocalRefreshToken, removeLocalTokens, setLocalTokens} from '../service/auth.service';
import {ITokenResponse} from '../types/IUser';
import {setLoggedIn} from './auth.reducer';
import {setRedirectAction} from './common.reducer';
import {IResponse, ResponseStatus} from '../types/response';
import {IPageable} from '../types/pageable';

const fetchBaseQueryOptions = {
    baseUrl: API_HOST,
    jsonContentType: 'application/json',
    responseHandler: async (response: any) => {
        const result: IResponse = await response.json();

        // Check if the response matches the envelope pattern (IResponse)
        if (result && typeof result === 'object') {
            if (result.status === ResponseStatus.SUCCESS && 'data' in result) {
                return result.data;
            }
            if (result.status === ResponseStatus.ERROR && 'error' in result) {
                return result.error;
            }
        }

        return result;
    },
};

export const baseQuery = fetchBaseQuery({
    ...fetchBaseQueryOptions,
    prepareHeaders: (headers: Headers): Headers => {
        const accessToken = getLocalAccessToken();
        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`);
            // Next line is possibly unnecessary and should be removed
            headers.set('Access-Control-Allow-Origin', '*');
        }
        return headers;
    },
});

export const baseQueryWithoutAccessToken = fetchBaseQuery(fetchBaseQueryOptions);

const fetchRefreshToken = async (api: BaseQueryApi, extraOptions: any): Promise<{data?: unknown; error?: unknown}> => {
    const refreshToken = getLocalRefreshToken();
    if (!refreshToken) {
        return {error: {status: 401}};
    }

    return baseQueryWithoutAccessToken(
        {
            url: '/auth/refresh',
            method: 'POST',
            headers: {authorization: `Bearer ${refreshToken}`},
        },
        api,
        extraOptions
    );
};

export const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
    const mutex = new Mutex();
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await fetchRefreshToken(api, extraOptions);

                if (refreshResult.data) {
                    setLocalTokens(refreshResult.data as ITokenResponse);
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    removeLocalTokens();
                    api.dispatch(setLoggedIn(false));
                    api.dispatch(setRedirectAction('/login'));
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
};

export const provideListTags =
    <T extends string>(tag: T) =>
    // returns a function that accepts both paginated and non-paginated results
    <R extends {_id: string}>(results?: R[] | IPageable<R>): TagDescription<T>[] => {
        if (results && 'pagination' in results) {
            return results.content
                ? [...results.content.map((item) => ({type: tag, id: item._id})), {type: tag, id: 'LIST'}]
                : [{type: tag, id: 'LIST'}];
        }
        return results
            ? [...results.map((item) => ({type: tag, id: item._id})), {type: tag, id: 'LIST'}]
            : [{type: tag, id: 'LIST'}];
    };

export const provideTag =
    <T extends string>(tag: T) =>
    <R extends {_id: string}>(result?: R): TagDescription<T>[] =>
        result ? [{type: tag, id: result._id}] : [];

export const provideTagById =
    <T extends string>(tag: T) =>
    (result: unknown, error: unknown, id?: string): TagDescription<T>[] =>
        id ? [{type: tag, id}] : [];

export const querySettings = {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
};
