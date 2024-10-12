import React, {ReactElement, useMemo, useState} from 'react';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {z} from 'zod';
import i18n from 'i18next';
import Field from '../../compounds/Field';
import Form from '../../compounds/Form';
import {useChangePasswordMutation, useLogoutOtherDevicesMutation} from '../../../store/api/auth.api';
import {ErrorCodes, IResponseError} from '../../../types/error';
import {mapApiToValidationErrors} from '../../../utils/utils';
import {useFetchUserQuery} from '../../../store/api/user.api';
import {H1, H2} from '../../elements/headers';
import {UserProfileContainer} from './UserProfile.style';
import Button from '../../elements/Button';

const ChangePasswordSchema = z
    .object({
        oldPassword: z.string().min(8),
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

export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>;

const UserProfile = (): ReactElement => {
    const {data: user} = useFetchUserQuery();

    const [showChangePassword, setShowChangePassword] = useState(false);
    const [changePasswordDto, setChangePasswordDto] = useState<ChangePasswordDto>({
        oldPassword: '',
        password: '',
        confirmedPassword: '',
    });

    const [changePassword, {error}] = useChangePasswordMutation();
    const apiError = (error as FetchBaseQueryError)?.data as IResponseError | undefined;
    const isWrongPassword = apiError?.code === ErrorCodes.WRONG_PASSWORD;
    const validationErrors = useMemo(() => mapApiToValidationErrors(apiError, 'registration.errors'), [apiError]);

    const handleSubmit = async (): Promise<void> => {
        await changePassword({...changePasswordDto}).unwrap();
        setShowChangePassword(false);
        setChangePasswordDto({oldPassword: '', password: '', confirmedPassword: ''});
    };

    const [logoutOtherDevices] = useLogoutOtherDevicesMutation();

    return (
        <UserProfileContainer>
            <H1>{user?.name}</H1>
            <H2>{user?.email}</H2>
            <Button onClick={() => setShowChangePassword(!showChangePassword)} data-test="change-password-show">
                Change password
            </Button>
            {showChangePassword && (
                <Form
                    onSubmit={handleSubmit}
                    formState={changePasswordDto}
                    onFormChange={setChangePasswordDto}
                    validationSchema={ChangePasswordSchema}
                    error={validationErrors}
                    testId="change-password-form"
                >
                    <Field
                        type="password"
                        name="oldPassword"
                        label="Old password"
                        placeholder="Old password"
                        required
                        errorMsg={isWrongPassword ? ['Wrong password'] : undefined}
                        testId="change-password-oldPassword"
                    />
                    <Field
                        name="password"
                        label="Password"
                        placeholder="password"
                        required
                        testId="change-password-password"
                    />
                    <Field
                        name="confirmedPassword"
                        label="Repeat Password"
                        placeholder="repeat password"
                        required
                        testId="change-password-confirmedPassword"
                    />
                </Form>
            )}
            <Button onClick={() => logoutOtherDevices()}>Log out from other devices</Button>
        </UserProfileContainer>
    );
};

export default UserProfile;
