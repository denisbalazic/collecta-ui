import * as Effects from 'redux-saga/effects';
import {put, takeLatest} from 'redux-saga/effects';
import {
    userLoginSuccessAction,
    userLogoutSuccessAction,
    userRegisterSuccessAction,
} from '../../reducer/auth/auth.actions';
import {getCurrentUser, login, logout, register, removeLocalToken, setLocalToken} from '../../../service/auth.service';
import {IUserLoginAction, IUserRegisterAction, USER_LOGIN, USER_LOGOUT, USER_REGISTER} from './auth.sagaActionTypes';

const {call} = Effects;

function* userRegisterSaga(action: IUserRegisterAction): Generator<void> | void {
    const response = yield call(register, action.payload);
    if (response.data.token) {
        setLocalToken(response.data.token);
        const userResponse = yield call(getCurrentUser);
        yield put(userRegisterSuccessAction(userResponse.data));
    }
}

function* userLoginSaga(action: IUserLoginAction): Generator<void> | void {
    const response = yield call(login, action.payload);
    if (response.data.token) {
        setLocalToken(response.data.token);
        const userResponse = yield call(getCurrentUser);
        yield put(userLoginSuccessAction(userResponse.data));
    }
}

function* userLogoutSaga(): Generator<void> | void {
    const response = yield call(logout);
    if (response.status === 200) {
        removeLocalToken();
        yield put(userLogoutSuccessAction());
    } else {
        // TODO: Logic for logout
    }
}

export function* authSaga(): Generator<Effects.ForkEffect<never>, void> {
    yield takeLatest(USER_REGISTER, userRegisterSaga);
    yield takeLatest(USER_LOGIN, userLoginSaga);
    yield takeLatest(USER_LOGOUT, userLogoutSaga);
}
