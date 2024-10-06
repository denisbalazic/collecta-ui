import React, {ReactElement, useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {z} from 'zod';
import i18n from 'i18next';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import Form from '../../compounds/Form';
import Field from '../../compounds/Field';
import CenteredContainer from '../../elements/CenteredContainer';
import {useRegisterMutation, useResendVerificationEmailMutation} from '../../../store/api/auth.api';
import Checkbox from '../../compounds/Checkbox';
import InfoBox from '../../compounds/InfoBox';
import {H2} from '../../elements/headers';
import {Strong} from '../../elements/Strong';
import {mapApiToValidationErrors} from '../../../utils/utils';
import {ErrorCodes, IResponseError} from '../../../types/error';
import Button from '../../elements/Button';
import ResendVerificationEmailMessage from '../../compounds/ResendVerificationEmailMessage';

const RegisterUserSchema = z
    .object({
        name: z
            .string()
            .min(2, {message: i18n.t('registration.errors.tooShort')})
            .max(36, {message: i18n.t('registration.errors.tooLong')})
            .refine((val) => /^[a-zA-Z0-9._ ]+$/.test(val), {message: i18n.t('registration.errors.noSpecialChars')}),

        email: z.string().email({message: i18n.t('registration.errors.invalidEmail')}),

        password: z.string().refine((val) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(val), {
            message: i18n.t('registration.errors.notStrongPassword'),
        }),

        confirmedPassword: z.string(),

        termsConfirmed: z.boolean().refine((val) => val, {message: i18n.t('registration.errors.mustBeTrue')}),
    })
    .superRefine((val, ctx) => {
        if (val.password !== val.confirmedPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['confirmedPassword'],
                message: i18n.t('registration.errors.passwordsDoNotMatch'),
            });
        }
    });

export type RegisterUserDto = z.infer<typeof RegisterUserSchema>;

const Register = (): ReactElement => {
    const [registerUser, setRegisterUser] = useState<RegisterUserDto>({
        name: '',
        email: '',
        password: '',
        confirmedPassword: '',
        termsConfirmed: false,
    });

    const [register, {isSuccess, isLoading, error}] = useRegisterMutation();
    const apiError = (error as FetchBaseQueryError)?.data as IResponseError | undefined;
    const validationErrors = useMemo(() => mapApiToValidationErrors(apiError, 'registration.errors'), [apiError]);
    const userExistsError = apiError?.code === ErrorCodes.USER_EXISTS;
    const userIsNotVerifiedError = apiError?.code === ErrorCodes.USER_NOT_VERIFIED;

    const [resendVerification] = useResendVerificationEmailMutation();

    return (
        <CenteredContainer>
            <InfoBox
                title="Register"
                subtitle={
                    <>
                        Already have an account? <Link to="/login">Login</Link>
                    </>
                }
            >
                {!isSuccess && !userExistsError && !userIsNotVerifiedError && (
                    <Form
                        onSubmit={() => register(registerUser)}
                        formState={registerUser}
                        onFormChange={setRegisterUser}
                        validationSchema={RegisterUserSchema}
                        error={validationErrors}
                        isLoading={isLoading}
                        testId="register-form"
                    >
                        <Field name="name" label="Name" required testId="register-name" />
                        <Field name="email" label="Email" required testId="register-email" />
                        <Field type="password" name="password" label="Password" required testId="register-password" />
                        <Field
                            type="password"
                            name="confirmedPassword"
                            label="Repeat password"
                            required
                            testId="register-confirmedPassword"
                        />
                        <Checkbox
                            name="termsConfirmed"
                            label={
                                <>
                                    I agree to{' '}
                                    <a
                                        href="https://www.termsfeed.com/blog/sample-terms-and-conditions-template/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        terms
                                    </a>
                                </>
                            }
                            testId="register-termsConfirmed"
                        />
                    </Form>
                )}

                {isSuccess && (
                    <H2 data-test="register-successMsg">
                        <p>
                            Thank you for signing up! We&apos;ve sent an email to <Strong>{registerUser.email}</Strong>.
                        </p>
                        <p>
                            Please click the link in the email to complete registration. Link will be valid for 1 hour.
                        </p>
                        <p>If you didn&apos;t receive the email, you can resend it.</p>
                        <Button
                            onClick={() => resendVerification(registerUser.email)}
                            size="md"
                            transparent
                            data-test="resend-verification-email"
                        >
                            Resend email
                        </Button>
                    </H2>
                )}

                {userExistsError && (
                    <H2 data-test="register-userExistsError">
                        <p>
                            You are already registered with email <Strong>{registerUser.email}</Strong>.{' '}
                            <Link to="/login">Login here</Link>.
                        </p>
                        <p>
                            If you forgot your password, you can{' '}
                            <Link to="/forgot-password" state={{email: registerUser.email}}>
                                reset it here
                            </Link>
                            .
                        </p>
                    </H2>
                )}

                {userIsNotVerifiedError && <ResendVerificationEmailMessage email={registerUser.email} />}
            </InfoBox>
        </CenteredContainer>
    );
};

export default Register;
