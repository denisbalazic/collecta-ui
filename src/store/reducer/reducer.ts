import {combineReducers} from 'redux';
import {ILoggedUserReducerState, loggedUserPreloadedState, authReducer} from './auth/auth.reducer';

export interface AppState {
    loggedUser: ILoggedUserReducerState;
}

export const reducerPreloadedState: AppState = {
    loggedUser: loggedUserPreloadedState,
};

const reducer = combineReducers({
    loggedUser: authReducer,
});

export default reducer;
