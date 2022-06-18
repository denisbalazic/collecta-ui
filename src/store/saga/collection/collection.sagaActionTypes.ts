import {ICollection} from '../../../types/ICollection';

export const FETCH_COLLECTIONS = 'FETCH_COLLECTIONS';
export const FETCH_COLLECTION = 'FETCH_COLLECTION';
export const CREATE_COLLECTION = 'CREATE_COLLECTION';
export const UPDATE_COLLECTION = 'UPDATE_COLLECTION';
export const DELETE_COLLECTION = 'DELETE_COLLECTION';

export interface IFetchCollectionsAction {
    type: typeof FETCH_COLLECTIONS;
}
export interface IFetchCollectionAction {
    type: typeof FETCH_COLLECTION;
    payload: string;
}
export interface ICreateCollectionAction {
    type: typeof CREATE_COLLECTION;
    payload: ICollection;
}
export interface IUpdateCollectionAction {
    type: typeof UPDATE_COLLECTION;
    payload: ICollection;
}
export interface IDeleteCollectionAction {
    type: typeof DELETE_COLLECTION;
    payload: string;
}
