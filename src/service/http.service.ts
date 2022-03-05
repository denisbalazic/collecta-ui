import axios from 'axios';
import {getLocalToken} from './auth.service';
import {API_HOST} from '../config';
import {IApiResponse, IBodyTypes} from '../types/IResponse';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
const prepareHeaders = (headers: any, addToken: boolean): any | undefined => {
    let preparedHeaders = headers || {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    };
    if (addToken) {
        const token = getLocalToken();
        if (token) {
            preparedHeaders = {
                ...preparedHeaders,
                Authorization: `Bearer ${token || ''}`,
            };
        }
        return preparedHeaders;
    }
    return undefined;
};

export enum MethodType {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export interface IApiCall {
    method: MethodType;
    url: string;
    body?: IBodyTypes;
    headers?: any;
    addToken?: boolean;
}

export async function apiCall({method, url, body, headers, addToken = true}: IApiCall): Promise<IApiResponse | null> {
    let response = null;
    try {
        switch (method) {
            case MethodType.GET:
                response = await axios.get(`${API_HOST}${url}`, {
                    headers: prepareHeaders(headers, addToken),
                });
                break;
            case MethodType.POST:
                response = await axios.post(`${API_HOST}${url}`, body, {
                    headers: prepareHeaders(headers, addToken),
                });
                break;
            case MethodType.PUT:
                response = await axios.put(`${API_HOST}${url}`, body, {
                    headers: prepareHeaders(headers, addToken),
                });
                break;
            case MethodType.DELETE:
                response = await axios.delete(`${API_HOST}${url}`, {
                    headers: prepareHeaders(headers, addToken),
                });
                break;
            default:
                break;
        }
    } catch (e: any) {
        console.log('inside apiCall: error');
        response = e.response;
    }
    return response;
}
