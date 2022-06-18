import {call, put} from 'redux-saga/effects';
import {IBodyTypes} from '../../../types/IResponse';

export interface IRequestSuccess {
    type: string;
    data?: IBodyTypes;
    onSuccess?: any;
}

export function* requestSuccess({type, data, onSuccess}: IRequestSuccess): Generator<void> | void {
    yield put({type: `${type}_SUCCESS`, payload: data});
    if (onSuccess) yield call(onSuccess, data);
}
