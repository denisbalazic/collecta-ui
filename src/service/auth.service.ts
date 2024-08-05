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
