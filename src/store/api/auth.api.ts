import {createApi} from '@reduxjs/toolkit/query/react';
import {removeLocalTokens, setLocalTokens} from '../../service/auth.service';
import {IResetPasswordDto, ITokenResponse} from '../../types/IUser';
import {setRedirectAction} from '../common.reducer';
import {fetchUserAction} from './user.api';
import {setLoggedIn, setVerified} from '../auth.reducer';
import {baseQueryWithReauth} from '../utils';
import {RegisterUserDto} from '../../components/views/auth/Register';
import {AuthCredentials} from '../../components/views/auth/Login';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        register: builder.mutation<ITokenResponse, RegisterUserDto>({
            query: (registerUser) => ({
                url: '/auth/register',
                method: 'POST',
                body: registerUser,
            }),
        }),
        login: builder.mutation<ITokenResponse, AuthCredentials>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            onQueryStarted: async (arg, {queryFulfilled, dispatch}) => {
                try {
                    const {data} = await queryFulfilled;
                    if (data.accessToken && data.refreshToken) {
                        setLocalTokens(data);
                        dispatch(setLoggedIn(true));
                        dispatch(fetchUserAction());
                        dispatch(setRedirectAction('/collections'));
                    }
                } catch (error) {
                    removeLocalTokens();
                    dispatch(setLoggedIn(false));
                }
            },
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            onQueryStarted: async (arg, {dispatch, queryFulfilled}) => {
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
                url: `/auth/verify?token=${token}`,
                method: 'POST',
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
        resendVerificationEmail: builder.mutation<void, string>({
            query: (email) => ({
                url: '/auth/resend-verification-email',
                method: 'POST',
                body: {email},
            }),
        }),
        forgotPassword: builder.mutation<void, string>({
            query: (email) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: {email},
            }),
        }),
        resetPassword: builder.mutation<void, IResetPasswordDto>({
            query: ({token, password, confirmedPassword}) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body: {token, password, confirmedPassword},
            }),
            onQueryStarted: async (arg, {queryFulfilled, dispatch}) => {
                try {
                    await queryFulfilled;
                    dispatch(setRedirectAction('/login'));
                } catch (error) {
                    // Handle error
                }
            },
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useVerifyEmailMutation,
    useResendVerificationEmailMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApi;
