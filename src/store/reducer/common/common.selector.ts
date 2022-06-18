import {AppState} from '../reducer';
import {ICommonReducerState} from './common.reducer';

export const commonSelector = (state: AppState): ICommonReducerState => state.common;
