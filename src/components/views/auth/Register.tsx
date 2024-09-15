import React, {ReactElement, useState} from 'react';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {Link} from 'react-router-dom';
import Form from '../../compounds/Form';
import Field from '../../compounds/Field';
import CenteredContainer from '../../elements/CenteredContainer';
import {useRegisterMutation} from '../../../store/api/auth.api';
import Checkbox from '../../compounds/Checkbox';
import InfoBox from '../../compounds/InfoBox';
import {H2} from '../../elements/headers';
import {Strong} from '../../elements/Strong';

const Register = (): ReactElement => {
    const [registerUser, setRegisterUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmedPassword: '',
        termsConfirmed: false,
    });

    const [register, {isSuccess, isLoading, error}] = useRegisterMutation();
    const errorObj = (error as FetchBaseQueryError)?.data as Record<string, string[]>;

    return (
        <CenteredContainer>
            <InfoBox
                title="Register"
                subtitle={
                    <>
                        <p>...to access all features we have to offer ;)</p>
                        Already have an account? <Link to="/login">Login</Link>
                    </>
                }
            >
                {!isSuccess ? (
                    <Form
                        onSubmit={() => register(registerUser)}
                        formState={registerUser}
                        onFormChange={setRegisterUser}
                        error={errorObj}
                        isLoading={isLoading}
                        data-testid="register-form"
                    >
                        <Field name="name" label="Name" placeholder="name" />
                        <Field name="email" label="Email" placeholder="email" />
                        <Field name="password" label="Password" placeholder="password" />
                        <Field name="confirmedPassword" label="Repeat password" placeholder="repeat password" />
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
                        />
                    </Form>
                ) : (
                    <H2 data-testid="register-success">
                        Thank you for signing up! We&apos;ve sent an email to <Strong>{registerUser.email}</Strong>.
                        Please click the link in the email to complete registration. Link will be valid for 1 hour.
                    </H2>
                )}
            </InfoBox>
        </CenteredContainer>
    );
};

export default Register;
