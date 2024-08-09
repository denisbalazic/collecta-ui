export interface IUser {
    id?: string;
    email: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface IRegisterUser {
    email: string;
    name: string;
    password: string;
    confirmedPassword: string;
}

export interface IAuthCredentials {
    email: string;
    password: string;
}

export interface IToken {
    // eslint-disable-next-line camelcase
    access_token: string;
    // eslint-disable-next-line camelcase
    token_type: string;
    // eslint-disable-next-line camelcase
    refresh_token: string;
    // eslint-disable-next-line camelcase
    expires_in: number;
    scope: string;
}

export interface ITokenResponse {
    token: string;
}

/* export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
} */
