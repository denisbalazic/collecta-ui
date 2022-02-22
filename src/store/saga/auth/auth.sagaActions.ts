import {ILoginSagaAction, USER_LOGIN_ACTION} from './auth.sagaActionTypes';

export const loginUserAction = (user: {email: string; password: string}): ILoginSagaAction => ({
    type: USER_LOGIN_ACTION,
    payload: user,
});
