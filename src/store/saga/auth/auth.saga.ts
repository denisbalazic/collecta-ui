import * as Effects from 'redux-saga/effects';
import {put, takeLatest} from 'redux-saga/effects';
import {login, logout, register, removeLocalToken, setLocalToken} from '../../../service/auth.service';
import {
    IUserLoginAction,
    IUserLogoutAction,
    IUserRegisterAction,
    USER_LOGIN,
    USER_LOGOUT,
    USER_REGISTER,
} from './auth.sagaActionTypes';
import {apiRequest} from '../helpers/apiRequest';
import {getCurrentUserAction} from '../user/user.sagaActions';

const {call} = Effects;

function* authSuccess(data: any): Generator<void> | void {
    if (data.token) {
        setLocalToken(data.token);
        yield put(getCurrentUserAction());
    }
}

function* userRegisterSaga(action: IUserRegisterAction): Generator<void> | void {
    yield call(apiRequest, {
        ...action,
        service: register,
        onSuccess: authSuccess,
    });
}

function* userLoginSaga(action: IUserLoginAction): Generator<void> | void {
    yield call(apiRequest, {
        ...action,
        service: login,
        onSuccess: authSuccess,
    });
}

function* userLogoutSaga(action: IUserLogoutAction): Generator<void> | void {
    yield call(apiRequest, {
        ...action,
        service: logout,
    });
    removeLocalToken();
}

export function* authSaga(): Generator<Effects.ForkEffect<never>, void> {
    yield takeLatest(USER_REGISTER, userRegisterSaga);
    yield takeLatest(USER_LOGIN, userLoginSaga);
    yield takeLatest(USER_LOGOUT, userLogoutSaga);
}
