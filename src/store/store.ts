import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {userApi} from './api/user.api';
import {commonReducer} from './common.reducer';
import {collectionApi} from './api/collection.api';
import {authApi} from './api/auth.api';
import {authReducer} from './auth.reducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [collectionApi.reducerPath]: collectionApi.reducer,
        common: commonReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, collectionApi.middleware, userApi.middleware),
});

setupListeners(store.dispatch);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
