import {createApi} from '@reduxjs/toolkit/query/react';
import {ICollection} from '../../types/ICollection';
import {WithoutId} from '../../types/utils';
import {setRedirectAction} from '../common.reducer';
import {baseQueryWithReauth, provideListTags, provideTag, provideTagById} from '../utils';
import {IPagination} from '../../types/pageable';

export const collectionApi = createApi({
    reducerPath: 'collectionApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Collection'],
    endpoints: (builder) => ({
        fetchCollections: builder.query<{content: ICollection[]; pagination: IPagination}, void>({
            query: () => 'collections',
            providesTags: provideListTags('Collection'),
        }),
        fetchCollection: builder.query<ICollection, string>({
            query: (id) => `collections/${id}`,
            providesTags: provideTag('Collection'),
        }),
        createCollection: builder.mutation<ICollection, WithoutId<ICollection>>({
            query: (body) => ({
                url: 'collections',
                method: 'POST',
                body,
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                const {data} = await queryFulfilled;
                dispatch(setRedirectAction(`/collections/${data._id}`));
            },
            invalidatesTags: ['Collection'],
        }),
        updateCollection: builder.mutation<ICollection, Partial<ICollection>>({
            query: (collection) => ({
                url: `collections/${collection._id}`,
                method: 'PUT',
                body: collection,
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                const {data} = await queryFulfilled;
                dispatch(setRedirectAction(`/collections/${data._id}`));
            },
            invalidatesTags: provideTag('Collection'),
        }),
        deleteCollection: builder.mutation<{success: boolean}, string>({
            query: (id) => ({
                url: `collections/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                await queryFulfilled;
                dispatch(setRedirectAction(`/collections`));
            },
            invalidatesTags: provideTagById('Collection'),
        }),
    }),
});

export const {
    useFetchCollectionsQuery,
    useFetchCollectionQuery,
    useCreateCollectionMutation,
    useUpdateCollectionMutation,
    useDeleteCollectionMutation,
} = collectionApi;
