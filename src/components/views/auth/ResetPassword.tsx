import React, {ReactElement, useMemo, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {z} from 'zod';
import i18n from 'i18next';
import CenteredContainer from '../../elements/CenteredContainer';
import Form from '../../compounds/Form';
import Field from '../../compounds/Field';
import {useResetPasswordMutation} from '../../../store/api/auth.api';
import InfoBox from '../../compounds/InfoBox';
import {ErrorCodes, IResponseError} from '../../../types/error';
import {mapApiToValidationErrors} from '../../../utils/utils';

// TODO: Move; ruse this in Registration and change password as well
const ResetPasswordSchema = z
    .object({
        password: z.string().refine((val) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(val), {
            message: i18n.t('registration.errors.notStrongPassword'),
        }),

        confirmedPassword: z.string(),
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

type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>;

const ResetPassword = (): ReactElement => {
    const {token = ''} = useParams();

    const [resetPasswordDto, setResetPasswordDto] = useState<ResetPasswordDto>({
        password: '',
        confirmedPassword: '',
    });

    const [resetPassword, {error}] = useResetPasswordMutation();
    const apiError = (error as FetchBaseQueryError)?.data as IResponseError | undefined;
    const isTokenInvalid = apiError?.code === ErrorCodes.INVALID_TOKEN;
    const validationErrors = useMemo(() => mapApiToValidationErrors(apiError, 'registration.errors'), [apiError]);

    return (
        <CenteredContainer>
            <InfoBox title="Reset password">
                {!isTokenInvalid ? (
                    <Form
                        onSubmit={() => resetPassword({...resetPasswordDto, token})}
                        formState={resetPasswordDto}
                        onFormChange={setResetPasswordDto}
                        validationSchema={ResetPasswordSchema}
                        error={validationErrors}
                        testId="reset-password-form"
                    >
                        <Field
                            type="password"
                            name="password"
                            label="Password"
                            placeholder="password"
                            required
                            testId="reset-password-password"
                        />
                        <Field
                            type="password"
                            name="confirmedPassword"
                            label="Repeat Password"
                            placeholder="repeat password"
                            required
                            testId="reset-password-confirmedPassword"
                        />
                    </Form>
                ) : (
                    <div data-test="reset-password-error">
                        <p>Your token is invalid or expired. Please try resetting your password again</p>
                        <Link to="/forgot-password">Reset password</Link>
                    </div>
                )}
            </InfoBox>
        </CenteredContainer>
    );
};

export default ResetPassword;
