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
    const errorObj = (error as FetchBaseQueryError)?.data as Record<string, string[]>;

    const handleSubmit = (): void => {
        register(registerUser);
    };

    if (isSuccess) {
        return <CenteredContainer>Email has been sent to your email address to verify registration</CenteredContainer>;
    }

    return (
        <CenteredContainer>
            <Form onSubmit={handleSubmit} formState={registerUser} onFormChange={setRegisterUser} error={errorObj}>
                <H1>Register</H1>
                <Field name="name" label="Name" placeholder="name" />
                <Field name="email" label="Email" placeholder="email" />
                <Field name="password" label="Password" placeholder="password" />
                <Field name="confirmedPassword" label="Repeat password" placeholder="repeat password" />
            </Form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </CenteredContainer>
    );
};

export default Register;
