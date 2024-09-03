import {createApi} from '@reduxjs/toolkit/query/react';
import {removeLocalTokens, setLocalTokens} from '../../service/auth.service';
import {IAuthCredentials, IRegisterUser, ITokenResponse} from '../../types/IUser';
import {setRedirectAction} from '../common.reducer';
import {fetchUserAction} from './user.api';
import {setLoggedIn, setRegistered, setVerified} from '../auth.reducer';
import {baseQueryWithReauth} from '../utils';
import {AppDispatch} from '../store';

const onLoginSuccess = async (
    queryFulfilled: Promise<{data: ITokenResponse}>,
    dispatch: AppDispatch,
    isRegister?: boolean
): Promise<void> => {
    try {
        const {data} = await queryFulfilled;
        if (data.accessToken && data.refreshToken) {
            setLocalTokens(data);
            dispatch(setLoggedIn(true));
            isRegister && dispatch(setRegistered());
            dispatch(fetchUserAction());
            dispatch(setRedirectAction('/collections'));
        }
    } catch (error) {
        removeLocalTokens();
        dispatch(setLoggedIn(false));
    }
};

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        register: builder.mutation<ITokenResponse, IRegisterUser>({
            query: (registerUser) => ({
                url: '/auth/register',
                method: 'POST',
                body: registerUser,
            }),
            onQueryStarted: async (arg, {queryFulfilled, dispatch}) => {
                await onLoginSuccess(queryFulfilled, dispatch, true);
            },
        }),
        login: builder.mutation<ITokenResponse, IAuthCredentials>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            onQueryStarted: async (arg, {queryFulfilled, dispatch}) => {
                await onLoginSuccess(queryFulfilled, dispatch);
            },
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            onQueryStarted: async (arg, {queryFulfilled, dispatch}) => {
                try {
                    await queryFulfilled;
                    removeLocalTokens();
                    dispatch(setLoggedIn(false));
                    dispatch(setRedirectAction('/'));
                    // TODO: Reset reducer; remove all sensitive data
                } catch (error) {
                    // Handle error
                }
            },
        }),
        logoutAll: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout-all',
                method: 'POST',
            }),
            // TODO: Make it logout all except current session (api needs to be updated)
            onQueryStarted: async (arg, {queryFulfilled, dispatch}) => {
                try {
                    await queryFulfilled;
                    removeLocalTokens();
                    dispatch(setLoggedIn(false));
                    dispatch(setRedirectAction('/'));
                } catch (error) {
                    // Handle error
                }
            },
        }),
        verifyEmail: builder.mutation<void, string>({
            query: (token) => ({
                url: '/auth/verify',
                method: 'POST',
                body: {token},
            }),
            onQueryStarted: async (arg, {queryFulfilled, dispatch}) => {
                try {
                    await queryFulfilled;
                    dispatch(setVerified());
                    dispatch(setRedirectAction('/login'));
                } catch (error) {
                    // Handle error
                }
            },
        }),
    }),
});

export const {useRegisterMutation, useLoginMutation, useLogoutMutation, useVerifyEmailMutation} = authApi;
