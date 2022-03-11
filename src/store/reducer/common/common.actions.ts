import {ISetRedirectAction, SET_REDIRECT} from './common.actionTypes';

export const setRedirectAction = (route: string): ISetRedirectAction => ({
    type: SET_REDIRECT,
    payload: route,
});
