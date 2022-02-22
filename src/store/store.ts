import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer, {reducerPreloadedState} from './reducer/reducer';
import {authSaga} from './saga/auth/auth.saga';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, reducerPreloadedState, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(authSaga);
