import {combineReducers} from 'redux';
import {authReducer, IAuthReducerState, authPreloadedState} from './auth/auth.reducer';
import {collectionPreloadedState, collectionReducer, ICollectionReducerState} from './collection/collection.reducer';
import {IUserReducerState, userPreloadedState, userReducer} from './user/user.reducer';
import {commonPreloadedState, commonReducer, ICommonReducerState} from './common/common.reducer';

export interface AppState {
    auth: IAuthReducerState;
    collection: ICollectionReducerState;
    user: IUserReducerState;
    common: ICommonReducerState;
}

export const reducerPreloadedState: AppState = {
    auth: authPreloadedState,
    collection: collectionPreloadedState,
    user: userPreloadedState,
    common: commonPreloadedState,
};

const reducer = combineReducers({
    auth: authReducer,
    collection: collectionReducer,
    user: userReducer,
    common: commonReducer,
});

export default reducer;
