import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useVerifyEmailMutation} from '../../../store/api/auth.api';
import InfoBox from '../../compounds/InfoBox';
import CenteredContainer from '../../elements/CenteredContainer';

const VerifyEmail = () => {
    const {token = ''} = useParams();
    const [verifyEmailMutation, {isSuccess, isLoading}] = useVerifyEmailMutation();

    useEffect(() => {
        if (token) {
            verifyEmailMutation(token);
        }
    }, [token, verifyEmailMutation]);

    return (
        <CenteredContainer>
            <InfoBox title="Email verification">
                {isSuccess ? (
                    <p>
                        Your email has been verified. You can now <a href="/login">login</a>.
                    </p>
                ) : (
                    <>
                        There was an error verifying your email. Please try again or <a href="/register">register</a>{' '}
                        again.
                    </>
                )}
            </InfoBox>
        </CenteredContainer>
    );
};

export default VerifyEmail;
