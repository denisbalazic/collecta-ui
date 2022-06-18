import {call, put} from 'redux-saga/effects';

export interface IRequestFailure {
    type: string;
    status: number;
    data?: any;
    onFailure?: any;
}

export function* requestFailure({type, status, data, onFailure}: IRequestFailure): Generator<void> | void {
    switch (status) {
        case 400:
            // TODO: Define what to do on 400
            yield put({type: `${type}_FAILURE`, payload: data.errors});
            break;
        case 401:
            // TODO: Define what to do on 401
            break;
        case 403:
            // TODO: Define what to do on 403
            break;
        case 408:
            // TODO: Define what to do on 408
            break;
        default:
            yield put({type: `${type}_FAILURE`, payload: []});
            break;
    }
    if (onFailure) yield call(onFailure, data);
}
