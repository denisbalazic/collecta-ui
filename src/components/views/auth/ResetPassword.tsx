import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import CenteredContainer from '../../elements/CenteredContainer';
import Form from '../../compounds/Form';
import H1 from '../../elements/H1';
import Field from '../../compounds/Field';
import {useResetPasswordMutation} from '../../../store/api/auth.api';

const ResetPassword = () => {
    const {token = ''} = useParams();

    const [resetPasswordDto, setResetPasswordDto] = useState({
        password: '',
        confirmedPassword: '',
    });

    const [resetPassword, {isSuccess, error}] = useResetPasswordMutation();

    const handleChange = (name: string, value: string | number): void => {
        setResetPasswordDto({
            ...resetPasswordDto,
            [name]: value,
        });
    };

    if (isSuccess) {
        return <CenteredContainer>Email has been sent to your email address to reset password</CenteredContainer>;
    }

    return (
        <CenteredContainer>
            <Form handleSubmit={() => resetPassword({...resetPasswordDto, token})}>
                <H1>Forgot password</H1>
                <Field
                    label="Password"
                    name="password"
                    placeholder="password"
                    value={resetPasswordDto.password}
                    handleChange={handleChange}
                />
                <Field
                    label="Repeat Password"
                    name="confirmedPassword"
                    placeholder="repeat password"
                    value={resetPasswordDto.confirmedPassword}
                    handleChange={handleChange}
                />
            </Form>
        </CenteredContainer>
    );
};

export default ResetPassword;
