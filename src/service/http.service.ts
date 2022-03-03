import axios from 'axios';
import {getLocalToken, getRefreshToken} from './auth.service';
import {API_HOST} from '../config';

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

export async function post(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    body: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    headers: any,
    addToken = true,
    skipInterceptor = false
) {
    let response;
    try {
        response = await axios.post(`${API_HOST}${url}`, body, {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            skipAuthRefresh: skipInterceptor,
            headers: prepareHeaders(headers, addToken),
        });
    } catch (e: any) {
        console.log(e);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return response;
}
export async function put(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    body: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    headers: any,
    addToken = true,
    skipInterceptor = false
) {
    let response;
    try {
        response = await axios.put(`${API_HOST}${url}`, body, {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            skipAuthRefresh: skipInterceptor,
            headers: prepareHeaders(headers, addToken),
        });
    } catch (e: any) {
        console.log(e);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return response;
}

export async function get(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    headers: any,
    addToken = true,
    skipInterceptor = false
): Promise<any> {
    let response;
    try {
        response = await axios.get(`${API_HOST}${url}`, {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            skipAuthRefresh: skipInterceptor,
            headers: prepareHeaders(headers, addToken),
        });
    } catch (e: any) {
        return e.response;
    }

    return response;
}
export async function deleteApi(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    headers: any,
    addToken = true,
    skipInterceptor = false
): Promise<any> {
    let response;
    try {
        response = await axios.delete(`${API_HOST}${url}`, {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            skipAuthRefresh: skipInterceptor,
            headers: prepareHeaders(headers, addToken),
        });
    } catch (e: any) {
        return e.response;
    }

    return response;
}
