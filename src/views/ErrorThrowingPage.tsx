import React, {ReactElement, useEffect} from 'react';

const ErrorThrowingPage = (): ReactElement => {
    useEffect(() => {
        throw new Error('testing error boundaries. delete me');
    }, []);

    return (
        <div>
            <p>This page will throw error in few moments</p>
        </div>
    );
};

export default ErrorThrowingPage;
