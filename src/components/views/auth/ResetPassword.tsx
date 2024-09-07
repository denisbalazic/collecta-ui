import React, {ReactElement, useState} from 'react';
import {useParams} from 'react-router-dom';
import CenteredContainer from '../../elements/CenteredContainer';
import Form from '../../compounds/Form';
import {H1} from '../../elements/headers';
import Field from '../../compounds/Field';
import {useResetPasswordMutation} from '../../../store/api/auth.api';

const ResetPassword = (): ReactElement => {
    const {token = ''} = useParams();

    const [resetPasswordDto, setResetPasswordDto] = useState({
        password: '',
        confirmedPassword: '',
    });

    const [resetPassword, {isSuccess, error}] = useResetPasswordMutation();

    if (isSuccess) {
        return <CenteredContainer>Email has been sent to your email address to reset password</CenteredContainer>;
    }

    return (
        <CenteredContainer>
            <Form
                onSubmit={() => resetPassword({...resetPasswordDto, token})}
                formState={resetPasswordDto}
                onFormChange={setResetPasswordDto}
            >
                <H1>Forgot password</H1>
                <Field name="password" label="Password" placeholder="password" />
                <Field name="confirmedPassword" label="Repeat Password" placeholder="repeat password" />
            </Form>
        </CenteredContainer>
    );
};

export default ResetPassword;
