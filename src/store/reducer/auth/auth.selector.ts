import {AppState} from '../reducer';
import {IAuthReducerState} from './auth.reducer';

export const authSelector = (state: AppState): IAuthReducerState => state.auth;
