import {ICollection} from '../../../types/ICollection';
import {IPagination, IValidationError, ResponseStatus} from '../../../types/IResponse';
import {
    CREATE_COLLECTION_SUCCESS,
    DELETE_COLLECTION_SUCCESS,
    FETCH_COLLECTION_SUCCESS,
    FETCH_COLLECTIONS_SUCCESS,
    ICollectionReducerActions,
    UPDATE_COLLECTION_SUCCESS,
} from './collection.actionTypes';

export interface ICollectionReducerState {
    collections?: {
        data: ICollection[];
        status?: ResponseStatus;
        pagination: IPagination;
    };
    collection?: {
        data: ICollection;
        status?: ResponseStatus;
        errors?: IValidationError[];
    };
}

export const collectionPreloadedState: ICollectionReducerState = {
    collections: {
        data: [],
        status: ResponseStatus.IDLE,
        pagination: {} as IPagination,
    },
    collection: {
        data: {} as ICollection,
        status: ResponseStatus.IDLE,
        errors: [],
    },
};

export const collectionReducer = (
    state: ICollectionReducerState = collectionPreloadedState,
    action: ICollectionReducerActions
): ICollectionReducerState => {
    switch (action.type) {
        case FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                collections: {
                    ...state.collections,
                    data: action.payload.data,
                    pagination: action.payload.pagination,
                },
            };
        case FETCH_COLLECTION_SUCCESS:
            return {
                ...state,
                collection: {
                    ...state.collection,
                    data: action.payload,
                },
            };
        case CREATE_COLLECTION_SUCCESS:
            return {
                ...state,
                collection: {
                    ...state.collection,
                    data: action.payload,
                },
            };
        case UPDATE_COLLECTION_SUCCESS:
            return {
                ...state,
                collection: {
                    ...state.collection,
                    data: action.payload,
                },
            };
        case DELETE_COLLECTION_SUCCESS:
            return {
                ...state,
                collection: {
                    ...state.collection,
                    data: action.payload,
                },
            };
        default:
            return {...state};
    }
};
