import React, {ReactElement} from 'react';

const ErrorFallback = ({error, resetErrorBoundary}: {error: any; resetErrorBoundary: any}): ReactElement => {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <p>Error:</p>
            <pre>{error.message}</pre>
            <button type="button" onClick={resetErrorBoundary}>
                Try again
            </button>
        </div>
    );
};

export default ErrorFallback;
