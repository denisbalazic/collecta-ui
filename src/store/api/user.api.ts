import {createApi} from '@reduxjs/toolkit/query/react';
import {IUser} from '../../types/IUser';
import {baseQuery} from '../utils';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery,
    endpoints: (builder) => ({
        fetchUser: builder.query<IUser, void>({
            query: () => 'users/me',
        }),
    }),
});

export const {useFetchUserQuery} = userApi;

export const fetchUserAction = userApi.endpoints.fetchUser.initiate;
