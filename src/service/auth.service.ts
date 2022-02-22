import qs from 'qs';
import {post} from './http.service';

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
    const header = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    return post('/v1/login/admin', qs.stringify(body), header, false, true);
}

export function removeToken(): void {
    localStorage.removeItem(TOKEN_STORAGE_NAME);
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_NAME);
}

export function getCurrentUser() {
    return post(`/v1/users/current`, {access_token: getLocalToken(), refresh_token: getRefreshToken()}, {}, false);
}

export function logout() {
    return post(`/v1/logout`, {}, {}, true);
}
