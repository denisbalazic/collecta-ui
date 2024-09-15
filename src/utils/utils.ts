import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {SerializedError} from '@reduxjs/toolkit';
import i18n from './i18n';

export const translateErrors = (
    error: FetchBaseQueryError | SerializedError | undefined,
    prefix: string
): Record<string, string[]> => {
    const errorObj = (error as FetchBaseQueryError)?.data as Record<string, string[]>;
    return errorObj
        ? Object.fromEntries(
              Object.entries(errorObj).map(([key, value]) => [
                  key,
                  value.map((errorMsg) => i18n.t(`${prefix}.${errorMsg}`)),
              ])
          )
        : {};
};
