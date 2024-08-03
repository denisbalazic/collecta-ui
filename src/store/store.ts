import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from '@redux-devtools/extension';
import reducer, {reducerPreloadedState} from './reducer/reducer';
import {authSaga} from './saga/auth/auth.saga';
import {collectionSaga} from './saga/collection/collection.saga';
import {userSaga} from './saga/user/user.saga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = process.env.NODE_ENV === `development` ? (composeWithDevTools as typeof compose) : compose;

export const store = createStore(
    reducer,
    reducerPreloadedState as unknown as undefined,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(authSaga);
sagaMiddleware.run(collectionSaga);
sagaMiddleware.run(userSaga);
