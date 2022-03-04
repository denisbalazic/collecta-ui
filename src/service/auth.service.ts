import {apiCall, MethodType} from './http.service';

const TOKEN_STORAGE_NAME = 'access_token';
const REFRESH_TOKEN_STORAGE_NAME = 'refresh_token';

export function getLocalToken(): string {
    return localStorage.getItem(TOKEN_STORAGE_NAME) || '';
}

export function getRefreshToken(): string {
    return localStorage.getItem(REFRESH_TOKEN_STORAGE_NAME) || '';
}

// eslint-disable-next-line camelcase
export function login({email, password}: {email: string; password: string}) {
    const body = {
        email,
        password,
        scope: 'read_all write_all',
        grant_type: 'password',
    };
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    return apiCall({
        method: MethodType.POST,
        url: '/v1/login/admin',
        body,
        headers,
    });
}

export function removeToken(): void {
    localStorage.removeItem(TOKEN_STORAGE_NAME);
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_NAME);
}

export function getCurrentUser() {
    return apiCall({
        method: MethodType.POST,
        url: `/v1/users/current`,
        // body: {access_token: getLocalToken(), refresh_token: getRefreshToken()},
    });
}

export function logout() {
    return apiCall({
        method: MethodType.POST,
        url: `/v1/logout`,
    });
}
