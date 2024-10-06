import React from 'react';
import {Strong} from '../elements/Strong';
import Button from '../elements/Button';
import {H2} from '../elements/headers';
import {useResendVerificationEmailMutation} from '../../store/api/auth.api';

interface ResendVerificationEmailMessageProps {
    email: string;
}

const ResendVerificationEmailMessage = ({email}: ResendVerificationEmailMessageProps) => {
    const [resendVerification, {isSuccess}] = useResendVerificationEmailMutation();

    return (
        <H2 data-test="auth-userIsNotVerifiedError">
            <p>
                User with email <Strong>{email}</Strong> is already registered, but is not verified. Please check your
                email for verification link.
            </p>
            <p>If you didn&apos;t receive the email, you can resend it.</p>
            <Button
                onClick={() => resendVerification(email)}
                size="md"
                transparent
                disabled={isSuccess}
                data-test="resend-verification-email"
            >
                Resend email
            </Button>
        </H2>
    );
};

export default ResendVerificationEmailMessage;
