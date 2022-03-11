import {combineReducers} from 'redux';
import {authReducer, IAuthReducerState, authPreloadedState} from './auth/auth.reducer';
import {collectionPreloadedState, collectionReducer, ICollectionReducerState} from './collection/collection.reducer';
import {IUserReducerState, userPreloadedState, userReducer} from './user/user.reducer';

export interface AppState {
    auth: IAuthReducerState;
    collection: ICollectionReducerState;
    user: IUserReducerState;
}

export const reducerPreloadedState: AppState = {
    auth: authPreloadedState,
    collection: collectionPreloadedState,
    user: userPreloadedState,
};

const reducer = combineReducers({
    auth: authReducer,
    collection: collectionReducer,
    user: userReducer,
});

export default reducer;
