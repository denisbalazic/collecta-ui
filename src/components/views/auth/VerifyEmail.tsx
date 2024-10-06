import React, {ReactElement, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {useVerifyEmailMutation} from '../../../store/api/auth.api';
import InfoBox from '../../compounds/InfoBox';
import CenteredContainer from '../../elements/CenteredContainer';
import Button from '../../elements/Button';
import LoadingSpinner from '../../elements/Spinner';
import {ErrorCodes, IResponseError} from '../../../types/error';

const VerifyEmail = (): ReactElement => {
    const {token = ''} = useParams();
    const [verifyEmailMutation, {isLoading, error}] = useVerifyEmailMutation();
    const errorObj = (error as FetchBaseQueryError)?.data as IResponseError | undefined;
    let errorMessage;
    if (errorObj?.code === ErrorCodes.INVALID_TOKEN) {
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

                {error && (
                    <div data-test="verify-email-error">
                        <p>{errorMessage || 'An error occurred while verifying your email.'}</p>
                        <p>Please try registering again.</p>
                        <Button to="/register" transparent>
                            Register
                        </Button>
                    </div>
                )}
            </InfoBox>
        </CenteredContainer>
    );
};

export default VerifyEmail;
