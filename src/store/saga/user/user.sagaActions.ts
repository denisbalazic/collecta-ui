import {GET_CURRENT_USER, IGetCurrentUserAction} from './user.sagaActionTypes';

export const getCurrentUserAction = (): IGetCurrentUserAction => ({
    type: GET_CURRENT_USER,
});
