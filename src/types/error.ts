/*
 * These types should match on the frontend and backend.
 * ErrorCodes specifically should be the same!!!
 * They are used to handle errors in the frontend.
 */

export interface IResponseErrorBase {
    path: string;
    timestamp: Date;
    errorId: string;
}

export interface IResponseError extends IResponseErrorBase {
    code: ErrorCodes;
    message: string;
    details?: IValidationError[];
}

export type IResponseErrorRest = Omit<IResponseError, keyof IResponseErrorBase>;

export enum ErrorCodes {
    BAD_REQUEST = 'BAD_REQUEST',
    VALIDATION_FAILED = 'VALIDATION_FAILED',

    USER_EXISTS = 'USER_EXISTS',
    USER_NOT_VERIFIED = 'USER_NOT_VERIFIED',

    INVALID_TOKEN = 'INVALID_TOKEN',
    EXPIRED_TOKEN = 'EXPRIED_TOKEN',

    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    LOGIN_LIMIT_EXCEEDED = 'LOGIN_LIMIT_EXCEEDED',
    WRONG_PASSWORD = 'WRONG_PASSWORD',

    SERVER_ERROR = 'SERVER_ERROR',
}

export interface IValidationError {
    property: string;
    value: string;
    constraints: Record<string, string>;
    children?: IValidationError[];
}
