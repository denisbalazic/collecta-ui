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
import {IValidationError, ResponseStatus} from '../../../types/IResponse';
import {IAuthSagaActions, USER_LOGIN, USER_REGISTER} from '../../saga/auth/auth.sagaActionTypes';

export interface IAuthReducerState {
    successfullyRegistered: boolean;
    loggedIn: boolean;
    loggedUser?: IUser;
    requestStatus: ResponseStatus;
    errors?: IValidationError[];
}

export const authPreloadedState: IAuthReducerState = {
    successfullyRegistered: false,
    loggedIn: false,
    requestStatus: ResponseStatus.IDLE,
    errors: [],
};

export const authReducer = (
    state: IAuthReducerState = authPreloadedState,
    action: IAuthReducerActions | IAuthSagaActions
): IAuthReducerState => {
    switch (action.type) {
        case USER_REGISTER:
            return {
                ...state,
                requestStatus: ResponseStatus.LOADING,
            };
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                successfullyRegistered: true,
                loggedIn: true,
                loggedUser: action.payload,
                requestStatus: ResponseStatus.SUCCESS,
            };
        case USER_REGISTER_FAILURE:
            return {
                ...state,
                successfullyRegistered: false,
                loggedIn: false,
                requestStatus: ResponseStatus.FAILURE,
                errors: action.payload,
            };
        case USER_LOGIN:
            return {
                ...state,
                loggedIn: true,
                requestStatus: ResponseStatus.LOADING,
            };
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                loggedUser: action.payload,
                requestStatus: ResponseStatus.SUCCESS,
            };
        case USER_LOGIN_FAILURE:
            return {
                ...state,
                loggedIn: false,
                requestStatus: ResponseStatus.FAILURE,
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
