import {getTaggedEmailAddress} from '../plugins/testEmail';

export const unregisteredUserDto = {
    name: 'Jess Unregistered',
    email: getTaggedEmailAddress('unregistered'),
    password: 'Password1!',
    confirmedPassword: 'Password1!',
    termsConfirmed: true,
};

export const unregisteredUserDto2 = {
    name: 'Jess Unregistered 2',
    email: getTaggedEmailAddress('unregistered2'),
    password: 'Password1!',
    confirmedPassword: 'Password1!',
    termsConfirmed: true,
};

export const unregisteredUserDto3 = {
    name: 'Jess Unregistered 3',
    email: getTaggedEmailAddress('unregistered3'),
    password: 'Password1!',
    confirmedPassword: 'Password1!',
    termsConfirmed: true,
};

export const unverifiedUserDto = {
    name: 'Jess Unverified',
    email: getTaggedEmailAddress('unverified'),
    password: 'Password1!',
    confirmedPassword: 'Password1!',
    termsConfirmed: true,
};

export const unverifiedUser = {
    _id: '620df4ef18b174c4ba6bb983',
    name: unverifiedUserDto.name,
    email: unverifiedUserDto.email,
    termsConfirmed: unverifiedUserDto.termsConfirmed,
    password: '$2b$08$K0JwhaRC0Y76Trh6l3qPH.3LSXH2uUMEhTWx3kM29iCc8pZXyKKmy',
    isVerified: false,
    verificationToken: '$2b$08$E4NA/s8Eqkw9oqQIAMFaFe3XRn8b8vkffOAV5NFKOTByMieNY5KWm',
    tokenExpiration: new Date(Date.now() + 60 * 60 * 1000),
    failedLoginAttempts: [],
};

export const unverifiedUserCredentials = {
    email: unverifiedUserDto.email,
    password: unverifiedUserDto.password,
};

export const unverifiedUserWithExpiredTokenDto = {
    name: 'Jess Unverified Expired',
    email: getTaggedEmailAddress('unverifiedExpired'),
    password: 'Password1!',
    confirmedPassword: 'Password1!',
    termsConfirmed: true,
};

export const unverifiedUserWithExpiredToken = {
    _id: '620df4ef18b174c4ba6bb998',
    name: unverifiedUserWithExpiredTokenDto.name,
    email: unverifiedUserWithExpiredTokenDto.email,
    termsConfirmed: unverifiedUserDto.termsConfirmed,
    password: '$2b$08$K0JwhaRC0Y76Trh6l3qPH.3LSXH2uUMEhTWx3kM29iCc8pZXyKKmy',
    isVerified: false,
    verificationToken: '$2b$08$E4NA/s8Eqkw9oqQIAMFaFe3XRn8b8vkffOAV5NFKOTByMieNY5KWm',
    tokenExpiration: new Date('2022-07-19T00:00:00.000Z'),
    failedLoginAttempts: [],
};

export const verifiedUserDto = {
    name: 'Jess Verified',
    email: getTaggedEmailAddress('verified'),
    password: 'Password1!',
    confirmedPassword: 'Password1!',
    termsConfirmed: true,
};

export const verifiedUser = {
    _id: '620df4ef18b174c4ba6bb984',
    name: verifiedUserDto.name,
    email: verifiedUserDto.email,
    termsConfirmed: verifiedUserDto.termsConfirmed,
    password: '$2b$08$S/Syd/ys8AkAevcMUgF.G.mKFNKAJfz.8Cy6n67zw.7OmvRCgT1Sa',
    isVerified: true,
    verificationToken: undefined,
    tokenExpiration: undefined,
    failedLoginAttempts: [],
};

export const verifiedUserCredentials = {
    email: verifiedUserDto.email,
    password: verifiedUserDto.password,
};

// This user is only used for repeated login attempts with wrong password
export const verifiedUser2Dto = {
    name: 'Jess Verified 2',
    email: getTaggedEmailAddress('verified2'),
    password: 'Password1!',
    confirmedPassword: 'Password1!',
    termsConfirmed: true,
};

export const verifiedUser2 = {
    _id: '620df4ef18b174c4ba6bb988',
    name: verifiedUser2Dto.name,
    email: verifiedUser2Dto.email,
    termsConfirmed: verifiedUser2Dto.termsConfirmed,
    password: '$2b$08$S/Syd/ys8AkAevcMUgF.G.mKFNKAJfz.8Cy6n67zw.7OmvRCgT1Sa',
    isVerified: true,
    verificationToken: undefined,
    tokenExpiration: undefined,
    failedLoginAttempts: [],
};

export const seed = {
    users: [verifiedUser, verifiedUser2, unverifiedUser, unverifiedUserWithExpiredToken],
} as Record<string, any[]>;

export const expiredToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Implc3NAdGVzdC5ldSIsInR5cGUiOiJWRVJJRlkiLCJpYXQiOjE3MjYzMDcwMTQsImV4cCI6MTcyNjMxMDYxNH0.g1TjvfqBkXWhX3A_kmrNcPXmkmyMIWIQDPaLDmh7f4I';
