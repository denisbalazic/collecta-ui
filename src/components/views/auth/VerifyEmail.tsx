import React from 'react';
import {useParams} from 'react-router-dom';
import {useVerifyEmailMutation} from '../../../store/api/auth.api';

const VerifyEmail = () => {
    const {token = ''} = useParams();
    const [verifyEmailMutation] = useVerifyEmailMutation();

    const handleVerifyEmail = (): void => {
        verifyEmailMutation(token);
    };

    return (
        <div>
            Verify Email
            <button type="button" onClick={handleVerifyEmail}>
                Verify
            </button>
        </div>
    );
};

export default VerifyEmail;
