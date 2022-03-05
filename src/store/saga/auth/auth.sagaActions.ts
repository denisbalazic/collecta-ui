import {IAuthCredentials, IRegisterUser} from '../../../types/IUser';
import {
    IUserLoginAction,
    IUserLogoutAction,
    IUserRegisterAction,
    USER_LOGIN,
    USER_LOGOUT,
    USER_REGISTER,
} from './auth.sagaActionTypes';

export const userRegisterAction = (registerUser: IRegisterUser): IUserRegisterAction => ({
    type: USER_REGISTER,
    payload: registerUser,
});

export const userLoginAction = (authCredentials: IAuthCredentials): IUserLoginAction => ({
    type: USER_LOGIN,
    payload: authCredentials,
});

export const userLogoutAction = (): IUserLogoutAction => ({
    type: USER_LOGOUT,
});
