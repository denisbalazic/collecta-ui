import {combineReducers} from 'redux';
import {authReducer, ILoggedUserReducerState, loggedUserPreloadedState} from './auth/auth.reducer';
import {collectionPreloadedState, collectionReducer, ICollectionReducerState} from './collection/collection.reducer';

export interface AppState {
    loggedUser: ILoggedUserReducerState;
    collection: ICollectionReducerState;
}

export const reducerPreloadedState: AppState = {
    loggedUser: loggedUserPreloadedState,
    collection: collectionPreloadedState,
};

const reducer = combineReducers({
    loggedUser: authReducer,
    collection: collectionReducer,
});

export default reducer;
