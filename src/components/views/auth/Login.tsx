import React, {ReactElement, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {useTranslation} from 'react-i18next';
import {z} from 'zod';
import i18n from 'i18next';
import Form from '../../compounds/Form';
import Field from '../../compounds/Field';
import CenteredContainer from '../../elements/CenteredContainer';
import {useLoginMutation} from '../../../store/api/auth.api';
import {authSelector} from '../../../store/auth.reducer';
import InfoBox from '../../compounds/InfoBox';
import {LoginFooter} from './Login.style';
import {ErrorMessage} from '../../elements/ErrorMessage';
import {ErrorCodes, IResponseError} from '../../../types/error';
import {mapApiToValidationErrors} from '../../../utils/utils';
import ResendVerificationEmailMessage from '../../compounds/ResendVerificationEmailMessage';
import {useAuth} from '../../../hooks/useAuth';

const CredentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, i18n.t('login.errors.passwordTooShort')),
});

export type AuthCredentials = z.infer<typeof CredentialsSchema>;

const Login = (): ReactElement => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {emailVerified} = useSelector(authSelector);
    const {loggedIn} = useAuth();

    if (loggedIn) {
        navigate('/collections');
    }

    const [login, {isLoading, error}] = useLoginMutation();
    const apiError = (error as FetchBaseQueryError)?.data as IResponseError | undefined;
    const validationErrors = useMemo(() => mapApiToValidationErrors(apiError, 'login.errors'), [apiError]);
    const wrongCredentials = apiError?.code === ErrorCodes.UNAUTHORIZED;
    const unverifiedUser = apiError?.code === ErrorCodes.USER_NOT_VERIFIED;
    const limitExceeded = apiError?.code === ErrorCodes.LOGIN_LIMIT_EXCEEDED;
    let errorMessage;
    if (limitExceeded) {
        errorMessage = t('login.errors.tooManyAttempts');
    } else if (wrongCredentials) {
        errorMessage = t('login.errors.wrongCredentials');
    }

    const [authCredentials, setAuthCredentials] = useState<AuthCredentials>({
        email: '',
        password: '',
    });

    return (
        <CenteredContainer>
            <InfoBox
                title="Login"
                subtitle={
                    emailVerified ? (
                        <p>Email was successfully verified. </p>
                    ) : (
                        <p>
                            Don&apos;t have an account? <Link to="/register">Register</Link>
                        </p>
                    )
                }
            >
                {!unverifiedUser ? (
                    <Form
                        onSubmit={() => login(authCredentials)}
                        formState={authCredentials}
                        validationSchema={CredentialsSchema}
                        onFormChange={setAuthCredentials}
                        isLoading={isLoading}
                        error={validationErrors}
                        testId="login-form"
                    >
                        <Field name="email" label="Email" placeholder="email" required testId="login-email" />
                        <Field
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="password"
                            required
                            testId="login-password"
                        />
                        <LoginFooter>
                            <Link to="/forgot-password">Forgot your password?</Link>
                        </LoginFooter>
                        <ErrorMessage data-test="login-error">{errorMessage}</ErrorMessage>
                    </Form>
                ) : (
                    <ResendVerificationEmailMessage email={authCredentials.email} />
                )}
            </InfoBox>
        </CenteredContainer>
    );
};

export default Login;
