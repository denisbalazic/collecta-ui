import {ICommonReducerActions, SET_REDIRECT} from './common.actionTypes';

export interface ICommonReducerState {
    redirectTo?: string;
}

export const commonPreloadedState: ICommonReducerState = {};

export const commonReducer = (
    state: ICommonReducerState = commonPreloadedState,
    action: ICommonReducerActions
): ICommonReducerState => {
    switch (action.type) {
        case SET_REDIRECT:
            return {
                ...state,
                redirectTo: action.payload,
            };
        default:
            return {...state};
    }
};
