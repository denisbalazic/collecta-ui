import {createApi} from '@reduxjs/toolkit/query/react';
import {IUser} from '../../types/IUser';
import {baseQueryWithReauth} from '../utils';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        fetchUser: builder.query<IUser, void>({
            query: () => 'users/me',
            providesTags: ['User'],
        }),
    }),
});

export const {useFetchUserQuery} = userApi;

export const fetchUserAction = userApi.endpoints.fetchUser.initiate;
