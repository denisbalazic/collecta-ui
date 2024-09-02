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

export interface ITokenResponse {
    accessToken: string;
    refreshToken: string;
}

/* export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
} */
