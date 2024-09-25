import {IResponseError} from './error';

/*
 * These types should match on the frontend and backend.
 * This is the envelope pattern for responses.
 */

export interface IResponse<T = unknown> {
    status: ResponseStatus;
    httpStatus: number;
    data?: T;
    error?: IResponseError;
}

export enum ResponseStatus {
    SUCCESS = 'success',
    FAIL = 'fail',
    ERROR = 'error',
}
