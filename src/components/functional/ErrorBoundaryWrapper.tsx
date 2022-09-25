import React, {ReactElement} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';

const ErrorBoundaryWrapper = ({children}: {children: ReactElement | ReactElement[]}): ReactElement => {
    const handleErrorReset = (): void => {
        // reset the state of your app so the error doesn't happen again:
        // clean reducer and redirect to home
    };

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleErrorReset}>
            {children}
        </ErrorBoundary>
    );
};

export default ErrorBoundaryWrapper;
