import {
    GET_CURRENT_USER_FAILURE,
    GET_CURRENT_USER_SUCCESS,
    IGetCurrentUserFailureAction,
    IGetCurrentUserSuccessAction,
} from './user.actionTypes';
import {IUser} from '../../../types/IUser';
import {IValidationError} from '../../../types/IResponse';

export const getCurrentUserSuccessAction = (user: IUser): IGetCurrentUserSuccessAction => ({
    type: GET_CURRENT_USER_SUCCESS,
    payload: user,
});

export const getCurrentUserFailureAction = (errors: IValidationError[]): IGetCurrentUserFailureAction => ({
    type: GET_CURRENT_USER_FAILURE,
    payload: errors,
});
