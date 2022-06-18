import * as Effects from 'redux-saga/effects';
import {takeLatest} from 'redux-saga/effects';
import {getCurrentUser} from '../../../service/auth.service';
import {GET_CURRENT_USER, IGetCurrentUserAction} from './user.sagaActionTypes';
import {apiRequest} from '../helpers/apiRequest';

const {call} = Effects;

export function* getCurrentUserSaga(action: IGetCurrentUserAction): Generator<void> | void {
    yield call(apiRequest, {
        ...action,
        service: getCurrentUser,
    });
}

export function* userSaga(): Generator<Effects.ForkEffect<never>, void> {
    yield takeLatest(GET_CURRENT_USER, getCurrentUserSaga);
}
