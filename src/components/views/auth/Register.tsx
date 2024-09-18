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
import {translateApiErrorMsgs} from '../../../utils/utils';

const RegisterUserSchema = z
    .object({
        name: z
            .string()
            .min(2, {message: i18n.t('registration.errors.tooShort')})
            .max(36, {message: i18n.t('registration.errors.tooLong')})
            .refine((val) => /^[a-zA-Z0-9. ]+$/.test(val), {message: i18n.t('registration.errors.noSpecialChars')}),

        email: z.string().email({message: i18n.t('registration.errors.invalidEmail')}),

        password: z.string().refine((val) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(val), {
            message: i18n.t('registration.errors.notStrongPassword'),
        }),

        confirmedPassword: z.string(),

        termsConfirmed: z.boolean().refine((val) => val, {message: i18n.t('registration.errors.mustBeTrue')}),
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
    const translatedErrors = translateApiErrorMsgs(error, 'registration.errors');

    return (
        <CenteredContainer>
            <InfoBox
                title="Register"
                subtitle={
                    <>
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
                        <Field name="name" label="Name" required />
                        <Field name="email" label="Email" required />
                        <Field name="password" label="Password" required />
                        <Field name="confirmedPassword" label="Repeat password" required />
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
