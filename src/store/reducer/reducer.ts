import {combineReducers} from 'redux';
import {authReducer, IAuthReducerState, authPreloadedState} from './auth/auth.reducer';
import {collectionPreloadedState, collectionReducer, ICollectionReducerState} from './collection/collection.reducer';

export interface AppState {
    loggedUser: IAuthReducerState;
    collection: ICollectionReducerState;
}

export const reducerPreloadedState: AppState = {
    loggedUser: authPreloadedState,
    collection: collectionPreloadedState,
};

const reducer = combineReducers({
    loggedUser: authReducer,
    collection: collectionReducer,
});

export default reducer;
