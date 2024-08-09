import React, {ReactElement, useState} from 'react';
import Form from '../../compounds/Form';
import Field from '../../compounds/Field';
import H1 from '../../elements/H1';
import CenteredContainer from '../../elements/CenteredContainer';
import {useRegisterMutation} from '../../../store/api/auth.api';

const Register = (): ReactElement => {
    const [register, {error}] = useRegisterMutation();

    const [registerUser, setRegisterUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmedPassword: '',
    });

    const handleChange = (name: string, value: string | number): void => {
        setRegisterUser({
            ...registerUser,
            [name]: value,
        });
    };

    const handleSubmit = (): void => {
        register(registerUser);
    };

    return (
        <CenteredContainer>
            <Form handleSubmit={handleSubmit}>
                <H1>Register</H1>
                <Field
                    label="Name"
                    name="name"
                    placeholder="name"
                    value={registerUser.name}
                    handleChange={handleChange}
                />
                <Field
                    label="Email"
                    name="email"
                    placeholder="email"
                    value={registerUser.email}
                    handleChange={handleChange}
                />
                <Field
                    label="Password"
                    name="password"
                    placeholder="password"
                    value={registerUser.password}
                    handleChange={handleChange}
                />
                <Field
                    label="Confirm password"
                    name="confirmedPassword"
                    placeholder="confirm password"
                    value={registerUser.confirmedPassword}
                    handleChange={handleChange}
                />
                {error && <p>Error</p>}
            </Form>
        </CenteredContainer>
    );
};

export default Register;
