import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {SerializedError} from '@reduxjs/toolkit';
import {ZodError} from 'zod';
import i18n from './i18n';

export const translateApiErrorMsgs = (
    error: FetchBaseQueryError | SerializedError | undefined,
    prefix: string
): Record<string, string[]> => {
    const errorObj = (error as FetchBaseQueryError)?.data as Record<string, string[]>;
    return errorObj
        ? Object.fromEntries(
              Object.entries(errorObj).map(([key, value]) => [
                  key,
                  value?.map((errorMsg) => i18n.t(`${prefix}.${errorMsg}`)),
              ])
          )
        : {};
};

export const mapZodToValidationErrors = (zodError: ZodError): Record<string, string[]> => {
    const errors: Record<string, string[]> = {};
    zodError.errors.forEach((e) => {
        errors[e.path[0]] = [...(errors[e.path[0]] || []), e.message];
    });
    return errors;
};

export const trimStringProperties = (
    obj: Record<string, string | number | boolean> | undefined
): Record<string, any> | undefined => {
    if (!obj) return obj;

    return Object.keys(obj).reduce((acc, key) => {
        const value = obj[key];
        if (typeof value === 'string') {
            acc[key] = value.trim(); // Trim string values
        } else if (typeof value === 'object' && value !== null) {
            acc[key] = trimStringProperties(value); // Recursively trim for nested objects
        } else {
            acc[key] = value; // Keep non-string values unchanged
        }
        return acc;
    }, {} as Record<string, any>);
};
