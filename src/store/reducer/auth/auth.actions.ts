import {ISuccessLoggedUserAction, USER_LOGIN_SUCCESS} from './auth.actionTypes';
import {IUser} from '../../../types/IUser';

export const successLoggedUserAction = (user: IUser): ISuccessLoggedUserAction => ({
    type: USER_LOGIN_SUCCESS,
    user,
});
