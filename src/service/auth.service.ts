import {ITokenResponse} from '../types/IUser';

export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';

export function getLocalRefreshToken(): string {
    return localStorage.getItem(REFRESH_TOKEN) || '';
}

export function getLocalAccessToken(): string {
    return localStorage.getItem(ACCESS_TOKEN) || '';
}

export function setLocalTokens(tokens: ITokenResponse): void {
    localStorage.setItem(ACCESS_TOKEN, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN, tokens.refreshToken);
}

export function removeLocalTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}
