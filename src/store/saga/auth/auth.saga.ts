import * as Effects from 'redux-saga/effects';
import {put, takeLatest} from 'redux-saga/effects';
import {successLoggedUserAction} from '../../reducer/auth/auth.actions';
import {getCurrentUser, login} from '../../../service/auth.service';
import {ILoginSagaAction, USER_LOGIN_ACTION} from './auth.sagaActionTypes';

const {call} = Effects;

function* loginUserSaga(action: ILoginSagaAction): Generator<void> | void {
    const token = yield call(login, action.payload);
    if (token.success) {
        localStorage.setItem('access_token', token.access_token);
        localStorage.setItem('refresh_token', token.refresh_token);
        const response = yield call(getCurrentUser);
        yield put(successLoggedUserAction(response.user));
    }
}

export function* authSaga(): Generator<Effects.ForkEffect<never>, void> {
    yield takeLatest(USER_LOGIN_ACTION, loginUserSaga);
}
