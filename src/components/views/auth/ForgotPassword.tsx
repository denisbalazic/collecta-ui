import React, {useState} from 'react';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import CenteredContainer from '../../elements/CenteredContainer';
import Form from '../../compounds/Form';
import {H2} from '../../elements/headers';
import Field from '../../compounds/Field';
import {useForgotPasswordMutation} from '../../../store/api/auth.api';
import {Strong} from '../../elements/Strong';
import InfoBox from '../../compounds/InfoBox';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const [sendPasswordResetRequest, {isSuccess, isLoading, error}] = useForgotPasswordMutation();
    const notFound = (error as FetchBaseQueryError)?.status === 404;
    const notVerifyed = (error as FetchBaseQueryError)?.status === 401;
    const errorMsg = notFound ? ['User with this email does not exist'] : notVerifyed ? ['User is not verified'] : [];

    return (
        <CenteredContainer>
            <InfoBox title="Reset password">
                {!isSuccess ? (
                    <Form onSubmit={() => sendPasswordResetRequest(email)} isLoading={isLoading}>
                        <Field
                            label="Email"
                            name="email"
                            placeholder="email"
                            value={email}
                            onChange={(_, v) => setEmail(v as string)}
                            errorMsg={errorMsg}
                        />
                    </Form>
                ) : (
                    <H2>
                        We&apos;ve sent an email to <Strong>{email}</Strong>. Please click the link in the email to
                        complete password reset. Link will be valid for 1 hour.
                    </H2>
                )}
            </InfoBox>
        </CenteredContainer>
    );
};

export default ForgotPassword;
