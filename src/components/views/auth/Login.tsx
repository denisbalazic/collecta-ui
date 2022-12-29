import React, {ReactElement, useState} from 'react';
import {useDispatch} from 'react-redux';
import {userLoginAction} from '../../../store/saga/auth/auth.sagaActions';
import Form from '../../compounds/Form';
import Field from '../../compounds/Field';
import H1 from '../../elements/H1';
import CenteredContainer from '../../elements/CenteredContainer';

const Login = (): ReactElement => {
    const dispatch = useDispatch();
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
        dispatch(userLoginAction(authCredentials));
    };

    return (
        <CenteredContainer>
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
            </Form>
        </CenteredContainer>
    );
};

export default Login;
