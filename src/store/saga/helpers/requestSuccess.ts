// import {push} from 'connected-react-router';
import {call, put} from 'redux-saga/effects';
import {IBodyTypes} from '../../../types/IResponse';

export interface IRequestSuccess {
    type: string;
    data?: IBodyTypes;
    redirect?: string;
    callback?: (x: any) => any;
    onSuccess?: (x: any) => any;
}

export function* requestSuccess({type, data, redirect, callback, onSuccess}: IRequestSuccess): Generator<void> | void {
    // if (redirect) yield put(push(redirect));
    if (redirect) console.log('Please, implement connected-react-router');
    yield put({type: `${type}_SUCCESS`, payload: data});
    if (callback) yield call(callback, data);
    if (onSuccess) yield call(onSuccess, data);
}
