import {
    IUserLoginFailureAction,
    IUserLoginSuccessAction,
    IUserLogoutFailureAction,
    IUserLogoutSuccessAction,
    IUserRegisterFailureAction,
    IUserRegisterSuccessAction,
    USER_LOGIN_FAILURE,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_FAILURE,
    USER_LOGOUT_SUCCESS,
    USER_REGISTER_FAILURE,
    USER_REGISTER_SUCCESS,
} from './auth.actionTypes';
import {IUser} from '../../../types/IUser';

export const userRegisterSuccessAction = (user: IUser): IUserRegisterSuccessAction => ({
    type: USER_REGISTER_SUCCESS,
    payload: user,
});

export const userRegisterFailureAction = (): IUserRegisterFailureAction => ({
    type: USER_REGISTER_FAILURE,
});

export const userLoginSuccessAction = (user: IUser): IUserLoginSuccessAction => ({
    type: USER_LOGIN_SUCCESS,
    payload: user,
});

export const userLoginFailureAction = (): IUserLoginFailureAction => ({
    type: USER_LOGIN_FAILURE,
});

export const userLogoutSuccessAction = (): IUserLogoutSuccessAction => ({
    type: USER_LOGOUT_SUCCESS,
});
export const userLogoutFailureAction = (): IUserLogoutFailureAction => ({
    type: USER_LOGOUT_FAILURE,
});
