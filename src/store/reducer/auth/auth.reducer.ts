import {ILoggedUserReducerActions, USER_LOGIN_SUCCESS} from './auth.actionTypes';

export interface ILoggedUserReducerState {
    loggedIn: boolean;
}

export const loggedUserPreloadedState: ILoggedUserReducerState = {
    loggedIn: false,
};

export const authReducer = (
    state: ILoggedUserReducerState = loggedUserPreloadedState,
    action: ILoggedUserReducerActions
): ILoggedUserReducerState => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
            };
        default:
            return {...state};
    }
};
