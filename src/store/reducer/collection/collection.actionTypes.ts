import {ICollection} from '../../../types/ICollection';
import {IPageableResponse} from '../../../types/IResponse';

export const FETCH_COLLECTIONS_SUCCESS = 'FETCH_COLLECTIONS_SUCCESS';
export const FETCH_COLLECTION_SUCCESS = 'FETCH_COLLECTION_SUCCESS';
export const CREATE_COLLECTION_SUCCESS = 'CREATE_COLLECTION_SUCCESS';
export const UPDATE_COLLECTION_SUCCESS = 'UPDATE_COLLECTION_SUCCESS';
export const DELETE_COLLECTION_SUCCESS = 'DELETE_COLLECTION_SUCCESS';

export interface IFetchCollectionsSuccessAction {
    type: typeof FETCH_COLLECTIONS_SUCCESS;
    payload: IPageableResponse<ICollection>;
}
export interface IFetchCollectionSuccessAction {
    type: typeof FETCH_COLLECTION_SUCCESS;
    payload: ICollection;
}
export interface ICreateCollectionSuccessAction {
    type: typeof CREATE_COLLECTION_SUCCESS;
    payload: ICollection;
}
export interface IUpdateCollectionSuccessAction {
    type: typeof UPDATE_COLLECTION_SUCCESS;
    payload: ICollection;
}
export interface IDeleteCollectionSuccessAction {
    type: typeof DELETE_COLLECTION_SUCCESS;
    payload: ICollection;
}

export type ICollectionReducerActions =
    | IFetchCollectionsSuccessAction
    | IFetchCollectionSuccessAction
    | ICreateCollectionSuccessAction
    | IUpdateCollectionSuccessAction
    | IDeleteCollectionSuccessAction;
