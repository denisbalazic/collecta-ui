import {apiCall, MethodType} from './http.service';
import {IAuthCredentials, IRegisterUser} from '../types/IUser';
import {IApiResponse} from '../types/IResponse';

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

export async function register(registerUser: IRegisterUser): Promise<IApiResponse | null> {
    return apiCall({
        method: MethodType.POST,
        url: '/auth/register',
        body: registerUser,
    });
}

export async function login(authCredentials: IAuthCredentials): Promise<IApiResponse | null> {
    /* const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }; */

    return apiCall({
        method: MethodType.POST,
        url: '/auth/login',
        body: authCredentials,
    });
}

export async function getCurrentUser(): Promise<IApiResponse | null> {
    return apiCall({
        method: MethodType.GET,
        url: `/users/me`,
    });
}

export async function logout(): Promise<IApiResponse | null> {
    return apiCall({
        method: MethodType.POST,
        url: `/auth/logout`,
    });
}
