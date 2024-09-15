import styled, {keyframes} from 'styled-components/macro';
import {ReactElement} from 'react';

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Spinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: ${spin} 1s linear infinite;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoadingSpinner = (): ReactElement => {
    return (
        <SpinnerContainer>
            <Spinner />
        </SpinnerContainer>
    );
};

export default LoadingSpinner;
