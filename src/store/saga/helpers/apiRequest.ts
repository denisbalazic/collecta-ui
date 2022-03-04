import {call} from 'redux-saga/effects';
import {IApiResponse, IBodyTypes} from '../../../types/IResponse';
import {requestSuccess} from './requestSuccess';
import {requestFailure} from './requestFailure';

/**
 * The apiRequest function can be used with redux saga to make async API calls.
 *
 * By passing strategical params, the redux action will contain
 * valuable information to oost the redux/saga process.
 *
 * @type          Action type (Eg. FETCH_DATA)
 * @payload       (optional) Action payload (could be object or string)
 * @service       API service making http request
 * @data          (optional) Data body to be sent over http request
 * @redirect      (optional) A react-router to redirect after the request is successful
 * @callback      (optional) A callback function to be called after the request is successful with the data processed
 * @onSuccess     (optional) A custom generator function passed to redux saga if the request is successful
 * @onFailure     (optional) A custom generator function passed to redux saga if the request fails
 * @payloadNormalizer    (optional) A custom reducer to process action payload data before reaching API service
 * @payloadNormalizer    (optional) A custom reducer to process API response data before reaching the reducer
 */

export interface IApiRequest {
    type: string;
    service: (x: any) => any;
    payload?: IBodyTypes | string;
    redirect?: string;
    callback?: (x: any) => any;
    onSuccess?: (x: any) => any;
    onFailure?: (x: any) => any;
    payloadNormalizer?: (x: any) => any;
    responseNormalizer?: (x: any) => any;
}

export function* apiRequest({
    type,
    payload,
    service,
    redirect,
    callback,
    onSuccess,
    onFailure,
    payloadNormalizer,
    responseNormalizer,
}: IApiRequest): Generator<void> | void {
    const normalizedPayload = payloadNormalizer ? payloadNormalizer(payload) : payload;

    const response: IApiResponse | null = yield call(service, normalizedPayload);

    if (!response) {
        // TODO: Handle server communication error
    } else {
        const {status, data} = response;
        if ([200, 201].includes(status)) {
            // If request call is successful
            const normalizedResponse = responseNormalizer ? responseNormalizer(data) : data;
            yield call(requestSuccess, {
                type,
                data: normalizedResponse,
                redirect,
                callback,
                onSuccess,
            });
        } else {
            // If request call fails
            yield call(requestFailure, {
                type,
                status,
                data,
                redirect,
                onFailure,
            });
        }
    }
    // TODO: Handle any loader ends
}
