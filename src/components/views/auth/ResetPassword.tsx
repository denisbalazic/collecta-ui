import React, {ReactElement, useState} from 'react';
import {useParams} from 'react-router-dom';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import CenteredContainer from '../../elements/CenteredContainer';
import Form from '../../compounds/Form';
import Field from '../../compounds/Field';
import {useResetPasswordMutation} from '../../../store/api/auth.api';
import InfoBox from '../../compounds/InfoBox';

const ResetPassword = (): ReactElement => {
    const {token = ''} = useParams();

    const [resetPasswordDto, setResetPasswordDto] = useState({
        password: '',
        confirmedPassword: '',
    });

    const [resetPassword, {error}] = useResetPasswordMutation();
    const errorObj = (error as FetchBaseQueryError)?.data as Record<string, string[]>;

    return (
        <CenteredContainer>
            <InfoBox title="Reset password">
                <Form
                    onSubmit={() => resetPassword({...resetPasswordDto, token})}
                    formState={resetPasswordDto}
                    onFormChange={setResetPasswordDto}
                    error={errorObj}
                >
                    <Field name="password" label="Password" placeholder="password" />
                    <Field name="confirmedPassword" label="Repeat Password" placeholder="repeat password" />
                </Form>
            </InfoBox>
        </CenteredContainer>
    );
};

export default ResetPassword;
