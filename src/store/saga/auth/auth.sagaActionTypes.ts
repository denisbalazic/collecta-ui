export const USER_LOGIN_ACTION = 'USER_LOGIN_ACTION';

export interface ILoginSagaAction {
    type: typeof USER_LOGIN_ACTION;
    payload: {email: string; password: string};
}
