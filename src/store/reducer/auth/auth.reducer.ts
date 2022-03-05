import {
    IAuthReducerActions,
    USER_LOGIN_FAILURE,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_FAILURE,
    USER_LOGOUT_SUCCESS,
    USER_REGISTER_FAILURE,
    USER_REGISTER_SUCCESS,
} from './auth.actionTypes';
import {IUser} from '../../../types/IUser';

export interface IAuthReducerState {
    successfullyRegistered: boolean;
    loggedIn: boolean;
    loggedUser?: IUser;
}

export const authPreloadedState: IAuthReducerState = {
    successfullyRegistered: false,
    loggedIn: false,
};

export const authReducer = (
    state: IAuthReducerState = authPreloadedState,
    action: IAuthReducerActions
): IAuthReducerState => {
    switch (action.type) {
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                successfullyRegistered: true,
                loggedIn: true,
                loggedUser: action.payload,
            };
        case USER_REGISTER_FAILURE:
            return {
                ...state,
                successfullyRegistered: false,
                loggedIn: false,
            };
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                loggedUser: action.payload,
            };
        case USER_LOGIN_FAILURE:
            return {
                ...state,
                loggedIn: false,
            };
        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                loggedIn: false,
                loggedUser: undefined,
            };
        // TODO: Logic for logout
        case USER_LOGOUT_FAILURE:
            return {
                ...state,
                loggedIn: false,
            };
        default:
            return {...state};
    }
};
