import {IUser} from '../../../types/IUser';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';

export interface ISuccessLoggedUserAction {
    type: typeof USER_LOGIN_SUCCESS;
    user: IUser;
}

export type ILoggedUserReducerActions = ISuccessLoggedUserAction;
