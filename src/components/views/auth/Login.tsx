import React, {ReactElement, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import Form from '../../compounds/Form';
import Field from '../../compounds/Field';
import {H1} from '../../elements/headers';
import CenteredContainer from '../../elements/CenteredContainer';
import {useLoginMutation} from '../../../store/api/auth.api';
import {authSelector} from '../../../store/auth.reducer';

const Login = (): ReactElement => {
    const [login, {error}] = useLoginMutation();
    const {emailVerified} = useSelector(authSelector);

    const [authCredentials, setAuthCredentials] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = (): void => {
        login(authCredentials);
    };

    return (
        <CenteredContainer>
            {emailVerified && <CenteredContainer>Email has been verified, you can now log in</CenteredContainer>}
            <Form onSubmit={handleSubmit} formState={authCredentials} onFormChange={setAuthCredentials}>
                <H1>Log in</H1>
                <Field name="email" label="Email" placeholder="email" />
                <Field name="password" label="Password" placeholder="password" />
                {error && <p>Wrong credentials or sth else :)</p>}
            </Form>
            <p>
                Don&apos;t have an account? <Link to="/register">Register</Link>{' '}
            </p>
            <p>
                Forgot your password? <Link to="/forgot-password">Reset password</Link>{' '}
            </p>
        </CenteredContainer>
    );
};

export default Login;
