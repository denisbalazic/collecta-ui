import {createApi} from '@reduxjs/toolkit/query/react';
import {removeLocalToken, setLocalToken} from '../../service/auth.service';
import {IAuthCredentials, IRegisterUser, ITokenResponse} from '../../types/IUser';
import {setRedirectAction} from '../common.reducer';
import {fetchUserAction} from './user.api';
import {setLoggedIn, setRegistered} from '../auth.reducer';
import {baseQuery} from '../utils';
import {AppDispatch} from '../store';

const onLoginSuccess = async (
    queryFulfilled: Promise<{data: ITokenResponse}>,
    dispatch: AppDispatch,
    isRegister?: boolean
): Promise<void> => {
    try {
        const {data} = await queryFulfilled;
        if (data.token) {
            setLocalToken(data.token);
            dispatch(setLoggedIn(true));
            isRegister && dispatch(setRegistered());
            dispatch(fetchUserAction());
            dispatch(setRedirectAction('/collections'));
        }
    } catch (error) {
        removeLocalToken();
        dispatch(setLoggedIn(false));
    }
};

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery,
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
                    removeLocalToken();
                    setLoggedIn(false);
                    dispatch(setRedirectAction('/'));
                    // TODO: Reset reducer; remove all sensitive data
                } catch (error) {
                    // Handle error
                }
            },
        }),
    }),
});

export const {useRegisterMutation, useLoginMutation, useLogoutMutation} = authApi;
