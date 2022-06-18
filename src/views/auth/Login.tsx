import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {userLoginAction} from '../../store/saga/auth/auth.sagaActions';
import Form from '../../components/form/Form';
import Field from '../../components/form/Field/Field';
import H1 from '../../components/elements/H1';
import CenteredContainer from '../../components/shared/CenteredContainer';

const Login = () => {
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
