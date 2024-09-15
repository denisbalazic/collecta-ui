import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {useVerifyEmailMutation} from '../../../store/api/auth.api';
import InfoBox from '../../compounds/InfoBox';
import CenteredContainer from '../../elements/CenteredContainer';
import Button from '../../elements/Button';
import LoadingSpinner from '../../elements/Spinner';

const VerifyEmail = () => {
    const {token = ''} = useParams();
    const [verifyEmailMutation, {isSuccess, isLoading, error}] = useVerifyEmailMutation();
    const expiredToken = (error as FetchBaseQueryError)?.status === 401;
    const invalidToken = (error as FetchBaseQueryError)?.status === 410;
    let errorMessage;
    if (expiredToken) {
        errorMessage = 'Token has expired.';
    } else if (invalidToken) {
        errorMessage = 'This link is no valid.';
    }

    useEffect(() => {
        if (token) {
            verifyEmailMutation(token);
        }
    }, [token, verifyEmailMutation]);

    return (
        <CenteredContainer>
            <InfoBox title="Email verification">
                {isLoading && <LoadingSpinner />}

                {isSuccess && (
                    <p>
                        Your email has been verified. You can now <a href="/login">login</a>.
                    </p>
                )}

                {error && (
                    <>
                        <p>{errorMessage || 'An error occurred while verifying your email.'}</p>
                        <p>Please try registering again.</p>
                        <Button to="/register" transparent>
                            Register
                        </Button>
                    </>
                )}
            </InfoBox>
        </CenteredContainer>
    );
};

export default VerifyEmail;
