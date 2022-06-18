export const GET_CURRENT_USER = 'GET_CURRENT_USER';

export interface IGetCurrentUserAction {
    type: typeof GET_CURRENT_USER;
}

export type IUserSagaActions = IGetCurrentUserAction;
