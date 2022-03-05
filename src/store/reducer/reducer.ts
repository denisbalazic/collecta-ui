import {combineReducers} from 'redux';
import {authReducer, IAuthReducerState, authPreloadedState} from './auth/auth.reducer';
import {collectionPreloadedState, collectionReducer, ICollectionReducerState} from './collection/collection.reducer';

export interface AppState {
    auth: IAuthReducerState;
    collection: ICollectionReducerState;
}

export const reducerPreloadedState: AppState = {
    auth: authPreloadedState,
    collection: collectionPreloadedState,
};

const reducer = combineReducers({
    auth: authReducer,
    collection: collectionReducer,
});

export default reducer;
