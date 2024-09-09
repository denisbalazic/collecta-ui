import React, {ReactElement, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import Form from '../../compounds/Form';
import Field from '../../compounds/Field';
import CenteredContainer from '../../elements/CenteredContainer';
import {useLoginMutation} from '../../../store/api/auth.api';
import {authSelector} from '../../../store/auth.reducer';
import InfoBox from '../../compounds/InfoBox';
import {LoginFooter} from './Login.style';
import {ErrorMessage} from '../../elements/ErrorMessage';

const Login = (): ReactElement => {
    const {emailVerified} = useSelector(authSelector);

    const [login, {isLoading, error}] = useLoginMutation();
    const errorObj = (error as FetchBaseQueryError)?.data as Record<string, string[]>;
    const wrongCredentials = (error as FetchBaseQueryError)?.status === 401;
    const limitExceeded = (error as FetchBaseQueryError)?.status === 429;
    let errorMessage;
    if (limitExceeded) {
        errorMessage = 'Too many failed login attempts. Try again in 5 minutes';
    } else if (wrongCredentials) {
        errorMessage = 'Wrong credentials';
    }

    const [authCredentials, setAuthCredentials] = useState({
        email: '',
        password: '',
    });

    return (
        <CenteredContainer>
            <InfoBox
                title="Login"
                subtitle={
                    emailVerified ? (
                        <p>Email was successfuly verified. </p>
                    ) : (
                        <p>
                            Don&apos;t have an account? <Link to="/register">Register</Link>
                        </p>
                    )
                }
            >
                <Form
                    onSubmit={() => login(authCredentials)}
                    formState={authCredentials}
                    onFormChange={setAuthCredentials}
                    isLoading={isLoading}
                    error={errorObj}
                >
                    <Field name="email" label="Email" placeholder="email" />
                    <Field name="password" label="Password" placeholder="password" />
                    <LoginFooter>
                        <Link to="/forgot-password">Forgot your password?</Link>
                    </LoginFooter>
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                </Form>
            </InfoBox>
        </CenteredContainer>
    );
};

export default Login;
