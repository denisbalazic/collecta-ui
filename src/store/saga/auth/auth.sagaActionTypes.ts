import {IAuthCredentials, IRegisterUser} from '../../../types/IUser';

export const USER_REGISTER = 'USER_REGISTER';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export interface IUserRegisterAction {
    type: typeof USER_REGISTER;
    payload: IRegisterUser;
}

export interface IUserLoginAction {
    type: typeof USER_LOGIN;
    payload: IAuthCredentials;
}

export interface IUserLogoutAction {
    type: typeof USER_LOGOUT;
}
