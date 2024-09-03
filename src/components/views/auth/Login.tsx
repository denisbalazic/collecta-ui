import React, {ReactElement, useState} from 'react';
import {useSelector} from 'react-redux';
import Form from '../../compounds/Form';
import Field from '../../compounds/Field';
import H1 from '../../elements/H1';
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

    const handleChange = (name: string, value: string | number): void => {
        setAuthCredentials({
            ...authCredentials,
            [name]: value,
        });
    };

    const handleSubmit = (): void => {
        login(authCredentials);
    };

    return (
        <CenteredContainer>
            {emailVerified && <CenteredContainer>Email has been verified, you can now log in</CenteredContainer>}
            <Form handleSubmit={handleSubmit}>
                <H1>Log in</H1>
                <Field
                    label="Email"
                    name="email"
                    placeholder="email"
                    value={authCredentials.email}
                    handleChange={handleChange}
                />
                <Field
                    label="Password"
                    name="password"
                    placeholder="password"
                    value={authCredentials.password}
                    handleChange={handleChange}
                />
                {error && <p>Wrong credentials or sth else :)</p>}
            </Form>
        </CenteredContainer>
    );
};

export default Login;
