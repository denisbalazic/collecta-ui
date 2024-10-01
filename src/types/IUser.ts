export interface IUser {
    id?: string;
    email: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface IResetPasswordDto {
    password: string;
    confirmedPassword: string;
    token: string;
}

export interface ITokenResponse {
    accessToken: string;
    refreshToken: string;
}

/* export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
} */
