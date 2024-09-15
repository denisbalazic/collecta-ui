import React, {ReactElement, useState} from 'react';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {Link} from 'react-router-dom';
import {z} from 'zod';
import Form from '../../compounds/Form';
import Field from '../../compounds/Field';
import CenteredContainer from '../../elements/CenteredContainer';
import {useRegisterMutation} from '../../../store/api/auth.api';
import Checkbox from '../../compounds/Checkbox';
import InfoBox from '../../compounds/InfoBox';
import {H2} from '../../elements/headers';
import {Strong} from '../../elements/Strong';

const RegisterUserSchema = z
    .object({
        name: z
            .string()
            .min(2, {message: 'Name must have between 2 and 36 characters'})
            .max(36, {message: 'Name must have between 2 and 36 characters'}),

        email: z.string().email({message: 'Invalid email address'}),

        password: z
            .string()
            .refine(
                (val) =>
                    val.length >= 8 && /[a-z]/.test(val) && /[A-Z]/.test(val) && /[0-9]/.test(val) && /[\W_]/.test(val),
                {
                    message:
                        'Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
                }
            ),

        confirmedPassword: z.string(),

        termsConfirmed: z.boolean().refine((val) => val, {message: 'Terms must be confirmed'}),
    })
    .superRefine((val, ctx) => {
        if (val.password !== val.confirmedPassword) {
            ctx.addIssue({code: z.ZodIssueCode.custom, path: ['confirmedPassword'], message: 'Passwords do not match'});
        }
    });

type RegisterUserDto = z.infer<typeof RegisterUserSchema>;

const Register = (): ReactElement => {
    const [registerUser, setRegisterUser] = useState<RegisterUserDto>({
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
                        validationSchema={RegisterUserSchema}
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
