import axios from 'axios';
import {getLocalToken, getRefreshToken} from './auth.service';
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
        const refreshToken = getRefreshToken();
        if (token || refreshToken) {
            preparedHeaders = {
                ...preparedHeaders,
                Authorization: `Bearer ${token || ''}`,
                refresh_token: `${refreshToken || ''}`,
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
    try {
        switch (method) {
            case MethodType.GET:
                return await axios.get(`${API_HOST}${url}`, {
                    headers: prepareHeaders(headers, addToken),
                });
            case MethodType.POST:
                return await axios.post(`${API_HOST}${url}`, body, {
                    headers: prepareHeaders(headers, addToken),
                });
            case MethodType.PUT:
                return await axios.put(`${API_HOST}${url}`, body, {
                    headers: prepareHeaders(headers, addToken),
                });
            case MethodType.DELETE:
                return await axios.delete(`${API_HOST}${url}`, {
                    headers: prepareHeaders(headers, addToken),
                });
            default:
                return null;
        }
    } catch (e: any) {
        console.log(e);
    }
    return null;
}
