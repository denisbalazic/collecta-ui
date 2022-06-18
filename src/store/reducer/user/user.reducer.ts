import {GET_CURRENT_USER_FAILURE, GET_CURRENT_USER_SUCCESS, IUserReducerActions} from './user.actionTypes';
import {IUser} from '../../../types/IUser';
import {IValidationError, ResponseStatus} from '../../../types/IResponse';
import {GET_CURRENT_USER, IUserSagaActions} from '../../saga/user/user.sagaActionTypes';

export interface IUserReducerState {
    loggedUser?: IUser;
    requestStatus: ResponseStatus;
    errors?: IValidationError[];
}

export const userPreloadedState: IUserReducerState = {
    requestStatus: ResponseStatus.IDLE,
    errors: [],
};

export const userReducer = (
    state: IUserReducerState = userPreloadedState,
    action: IUserReducerActions | IUserSagaActions
): IUserReducerState => {
    switch (action.type) {
        case GET_CURRENT_USER:
            return {
                ...state,
                requestStatus: ResponseStatus.LOADING,
            };
        case GET_CURRENT_USER_SUCCESS:
            return {
                ...state,
                loggedUser: action.payload,
                requestStatus: ResponseStatus.SUCCESS,
            };
        case GET_CURRENT_USER_FAILURE:
            return {
                ...state,
                requestStatus: ResponseStatus.FAILURE,
                errors: action.payload,
            };
        default:
            return {...state};
    }
};
