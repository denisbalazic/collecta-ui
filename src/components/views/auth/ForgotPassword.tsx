import React, {useState} from 'react';
import CenteredContainer from '../../elements/CenteredContainer';
import Form from '../../compounds/Form';
import H1 from '../../elements/H1';
import Field from '../../compounds/Field';
import {useForgotPasswordMutation} from '../../../store/api/auth.api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const [mutate, {isSuccess, error}] = useForgotPasswordMutation();

    if (isSuccess) {
        return <CenteredContainer>Email has been sent to your email address to reset password</CenteredContainer>;
    }

    return (
        <CenteredContainer>
            <Form onSubmit={() => mutate(email)}>
                <H1>Forgot password</H1>
                <Field label="Email" name="email" placeholder="email" value={email} onChange={(v) => setEmail(v)} />
                {error && <p>Email does not exist or sth else :)</p>}
            </Form>
        </CenteredContainer>
    );
};

export default ForgotPassword;
