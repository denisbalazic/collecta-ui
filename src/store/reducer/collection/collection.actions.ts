import {
    CREATE_COLLECTION_SUCCESS,
    DELETE_COLLECTION_SUCCESS,
    FETCH_COLLECTION_SUCCESS,
    FETCH_COLLECTIONS_SUCCESS,
    ICreateCollectionSuccessAction,
    IDeleteCollectionSuccessAction,
    IFetchCollectionsSuccessAction,
    IFetchCollectionSuccessAction,
    IUpdateCollectionSuccessAction,
    UPDATE_COLLECTION_SUCCESS,
} from './collection.actionTypes';
import {IPageableResponse} from '../../../types/IResponse';
import {ICollection} from '../../../types/ICollection';

export const fetchCollectionsSuccessAction = (
    collections: IPageableResponse<ICollection>
): IFetchCollectionsSuccessAction => ({
    type: FETCH_COLLECTIONS_SUCCESS,
    payload: collections,
});
export const fetchCollectionSuccessAction = (collection: ICollection): IFetchCollectionSuccessAction => ({
    type: FETCH_COLLECTION_SUCCESS,
    payload: collection,
});
export const createCollectionSuccessAction = (collection: ICollection): ICreateCollectionSuccessAction => ({
    type: CREATE_COLLECTION_SUCCESS,
    payload: collection,
});
export const updateCollectionSuccessAction = (collection: ICollection): IUpdateCollectionSuccessAction => ({
    type: UPDATE_COLLECTION_SUCCESS,
    payload: collection,
});
export const deleteCollectionSuccessAction = (collection: ICollection): IDeleteCollectionSuccessAction => ({
    type: DELETE_COLLECTION_SUCCESS,
    payload: collection,
});
