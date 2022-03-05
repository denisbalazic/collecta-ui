import {apiCall, MethodType} from './http.service';
import {IAuthCredentials, IRegisterUser} from '../types/IUser';

const TOKEN_STORAGE_NAME = 'token';

export function getLocalToken(): string {
    return localStorage.getItem(TOKEN_STORAGE_NAME) || '';
}

export function setLocalToken(token: string): void {
    localStorage.setItem(TOKEN_STORAGE_NAME, token);
}

export function removeLocalToken(): void {
    localStorage.removeItem(TOKEN_STORAGE_NAME);
}

export function register(registerUser: IRegisterUser) {
    return apiCall({
        method: MethodType.POST,
        url: '/auth/register',
        body: registerUser,
    });
}

export function login(authCredentials: IAuthCredentials) {
    /* const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }; */

    return apiCall({
        method: MethodType.POST,
        url: '/auth/login',
        body: authCredentials,
    });
}

export function getCurrentUser() {
    return apiCall({
        method: MethodType.GET,
        url: `/users/me`,
    });
}

export function logout() {
    return apiCall({
        method: MethodType.POST,
        url: `/auth/logout`,
    });
}
