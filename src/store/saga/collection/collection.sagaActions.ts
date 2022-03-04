import {ICollection} from '../../../types/ICollection';
import {
    CREATE_COLLECTION,
    DELETE_COLLECTION,
    FETCH_COLLECTION,
    FETCH_COLLECTIONS,
    ICreateCollectionAction,
    IDeleteCollectionAction,
    IFetchCollectionAction,
    IFetchCollectionsAction,
    IUpdateCollectionAction,
    UPDATE_COLLECTION,
} from './collection.sagaActionTypes';

export const fetchCollectionsAction = (): IFetchCollectionsAction => ({
    type: FETCH_COLLECTIONS,
});

export const fetchCollectionAction = (collectionId: string): IFetchCollectionAction => ({
    type: FETCH_COLLECTION,
    payload: collectionId,
});

export const createCollectionAction = (collection: ICollection): ICreateCollectionAction => ({
    type: CREATE_COLLECTION,
    payload: collection,
});
export const updateCollectionAction = (collection: ICollection): IUpdateCollectionAction => ({
    type: UPDATE_COLLECTION,
    payload: collection,
});
export const deleteCollectionAction = (collectionId: string): IDeleteCollectionAction => ({
    type: DELETE_COLLECTION,
    payload: collectionId,
});
