import {createSlice} from '@reduxjs/toolkit';
import {AppState} from './store';

export interface IAuthReducerState {
    successfullyRegistered: boolean;
    loggedIn: boolean;
}

export const authPreloadedState: IAuthReducerState = {
    successfullyRegistered: false,
    loggedIn: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: authPreloadedState,
    reducers: {
        setRegistered(state) {
            state.successfullyRegistered = true;
        },
        setLoggedIn(state, action) {
            state.loggedIn = action.payload;
        },
    },
});

export const authReducer = authSlice.reducer;

export const {setRegistered, setLoggedIn} = authSlice.actions;

export const authSelector = (state: AppState): IAuthReducerState => state.auth;
