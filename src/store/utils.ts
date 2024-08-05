import {fetchBaseQuery, TagDescription} from '@reduxjs/toolkit/query/react';
import {API_HOST} from '../config';
import {getLocalToken} from '../service/auth.service';
import {IPageableResponse} from '../types/IResponse';

export const baseQuery = fetchBaseQuery({
    baseUrl: API_HOST,
    prepareHeaders: (headers) => {
        const token = getLocalToken();
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
            // Next line is possibly unnecessary and should be removed
            headers.set('Access-Control-Allow-Origin', '*');
        }
        return headers;
    },
    jsonContentType: 'application/json',
});

export const provideListTags =
    <T extends string>(tag: T) =>
    // returns a function that accepts both paginated and non-paginated results
    <R extends {_id: string}>(results?: R[] | IPageableResponse<R>): TagDescription<T>[] => {
        if (results && 'pagination' in results) {
            return results.data
                ? [...results.data.map((item) => ({type: tag, id: item._id})), {type: tag, id: 'LIST'}]
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
