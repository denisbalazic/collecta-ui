import {IUser} from '../../../types/IUser';
import {IValidationError} from '../../../types/IResponse';

export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
export const GET_CURRENT_USER_FAILURE = 'GET_CURRENT_USER_FAILURE';

export interface IGetCurrentUserSuccessAction {
    type: typeof GET_CURRENT_USER_SUCCESS;
    payload: IUser;
}

export interface IGetCurrentUserFailureAction {
    type: typeof GET_CURRENT_USER_FAILURE;
    payload: IValidationError[];
}

export type IUserReducerActions = IGetCurrentUserSuccessAction | IGetCurrentUserFailureAction;
