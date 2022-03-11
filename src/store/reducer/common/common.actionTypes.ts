export const SET_REDIRECT = 'SET_REDIRECT';

export interface ISetRedirectAction {
    type: typeof SET_REDIRECT;
    payload: string;
}

export type ICommonReducerActions = ISetRedirectAction;
