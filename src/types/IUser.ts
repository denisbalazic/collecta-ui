export interface IUser {
    id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    passwordRepeat?: string;
    address?: string;
    companyInvoice?: boolean;
    institution?: string;
    lastActiveAt?: null;
    oib?: string;
    phoneNumber?: string;
    privacyConsent?: boolean;
    termsConsent?: boolean;
    enabled?: boolean;
    verified?: boolean;
    sendCredentials?: boolean;
    createdAt?: string;
    lastUpdated?: string;
    token?: unknown;
    role?: string;
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

/* export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
} */
