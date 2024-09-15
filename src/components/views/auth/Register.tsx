import React, {ReactElement, useState} from 'react';
import {Link} from 'react-router-dom';
import {z} from 'zod';
import i18n from 'i18next';
import Form from '../../compounds/Form';
import Field from '../../compounds/Field';
import CenteredContainer from '../../elements/CenteredContainer';
import {useRegisterMutation} from '../../../store/api/auth.api';
import Checkbox from '../../compounds/Checkbox';
import InfoBox from '../../compounds/InfoBox';
import {H2} from '../../elements/headers';
import {Strong} from '../../elements/Strong';
import {translateErrors} from '../../../utils/utils';

const formatErrorMsg = (msg: string): {message: string} => ({message: i18n.t(`registration.errors.${msg}`)});

const RegisterUserSchema = z
    .object({
        name: z
            .string()
            .min(1, formatErrorMsg('required'))
            .min(2, formatErrorMsg('tooShort'))
            .max(36, formatErrorMsg('tooLong')),

        email: z.string().min(1, formatErrorMsg('required')).email(formatErrorMsg('invalidEmail')),

        password: z
            .string()
            .min(1, formatErrorMsg('required'))
            .refine(
                (val) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(val),
                formatErrorMsg('notStrongPassword')
            ),

        confirmedPassword: z.string().min(1, formatErrorMsg('required')),

        termsConfirmed: z.boolean().refine((val) => val, formatErrorMsg('mustBeTrue')),
    })
    .superRefine((val, ctx) => {
        if (val.password !== val.confirmedPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['confirmedPassword'],
                message: i18n.t('registration.errors.passwordsDoNotMatch'),
            });
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
    const translatedErrors = translateErrors(error, 'registration.errors');

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
                        error={translatedErrors}
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
