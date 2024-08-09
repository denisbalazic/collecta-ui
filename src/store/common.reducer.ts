import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppState} from './store';

interface ICommonReducerState {
    redirectTo?: string;
}

const initialState: ICommonReducerState = {};

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setRedirectAction(state, action: PayloadAction<string>) {
            state.redirectTo = action.payload;
        },
    },
});

export const commonReducer = commonSlice.reducer;

export const {setRedirectAction} = commonSlice.actions;

export const commonSelector = (state: AppState): ICommonReducerState => state.common;
