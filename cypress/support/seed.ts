export const unregisteredUserDto = {
    name: 'Jess Unregistered',
    email: 'jess.unregistered@test.eu',
    password: 'Password1!',
    confirmedPassword: 'Password1!',
    termsConfirmed: true,
};

export const unverifiedUserDto = {
    name: 'Jess Unverified',
    email: 'jess.unverified@test.eu',
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
    verificationToken: '$2b$08$/cyfe8oTwvK0rT7jvUU.8OJksoK14Z3veva1E3DJuQsyBneP/N0u2',
    failedLoginAttempts: [],
};

export const verifiedUserDto = {
    name: 'Jess Verified',
    email: 'jess.verified@test.eu',
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
    verificationToken: '',
    failedLoginAttempts: [],
};

export const expiredToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Implc3NAdGVzdC5ldSIsInR5cGUiOiJWRVJJRlkiLCJpYXQiOjE3MjYzMDcwMTQsImV4cCI6MTcyNjMxMDYxNH0.g1TjvfqBkXWhX3A_kmrNcPXmkmyMIWIQDPaLDmh7f4I';

export const seed = {
    users: [unverifiedUser, verifiedUser],
} as Record<string, any[]>;
