import React, {ReactElement, useState} from 'react';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {Link} from 'react-router-dom';
import Form from '../../compounds/Form';
import Field from '../../compounds/Field';
import H1 from '../../elements/H1';
import CenteredContainer from '../../elements/CenteredContainer';
import {useRegisterMutation} from '../../../store/api/auth.api';

const Register = (): ReactElement => {
    const [registerUser, setRegisterUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmedPassword: '',
    });

    const [register, {error, isSuccess}] = useRegisterMutation();
    const errorObj = (error as FetchBaseQueryError)?.data as Record<string, string>;

    const handleChange = (name: string, value: string | number): void => {
        setRegisterUser({
            ...registerUser,
            [name]: value,
        });
    };

    const handleSubmit = (): void => {
        register(registerUser);
    };

    if (isSuccess) {
        return <CenteredContainer>Email has been sent to your email address to verify registration</CenteredContainer>;
    }

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
                    errorMsg={errorObj}
                />
                <Field
                    label="Email"
                    name="email"
                    placeholder="email"
                    value={registerUser.email}
                    handleChange={handleChange}
                    errorMsg={errorObj}
                />
                <Field
                    label="Password"
                    name="password"
                    placeholder="password"
                    value={registerUser.password}
                    handleChange={handleChange}
                    errorMsg={errorObj}
                />
                <Field
                    label="Repeat password"
                    name="confirmedPassword"
                    placeholder="repeat password"
                    value={registerUser.confirmedPassword}
                    handleChange={handleChange}
                    errorMsg={errorObj}
                />
            </Form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </CenteredContainer>
    );
};

export default Register;
