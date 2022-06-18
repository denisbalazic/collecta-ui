import {IUser} from '../../../types/IUser';
import {IValidationError} from '../../../types/IResponse';

export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE';

export interface IUserRegisterSuccessAction {
    type: typeof USER_REGISTER_SUCCESS;
    payload: IUser;
}

export interface IUserRegisterFailureAction {
    type: typeof USER_REGISTER_FAILURE;
    payload: IValidationError[];
}

export interface IUserLoginSuccessAction {
    type: typeof USER_LOGIN_SUCCESS;
    payload: IUser;
}

export interface IUserLoginFailureAction {
    type: typeof USER_LOGIN_FAILURE;
}

export interface IUserLogoutSuccessAction {
    type: typeof USER_LOGOUT_SUCCESS;
}

export interface IUserLogoutFailureAction {
    type: typeof USER_LOGOUT_FAILURE;
}

export type IAuthReducerActions =
    | IUserRegisterSuccessAction
    | IUserRegisterFailureAction
    | IUserLoginSuccessAction
    | IUserLoginFailureAction
    | IUserLogoutSuccessAction
    | IUserLogoutFailureAction;
