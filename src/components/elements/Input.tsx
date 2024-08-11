import React, {ReactElement} from 'react';
import styled from 'styled-components/macro';
import {Icon} from '@iconify/react';

interface InputProps {
    type: 'text' | 'password' | 'email';
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    startAdornment?: string;
    endAdornment?: string;
}

const InputContainer = styled.div`
    position: relative;
    display: inline-block;
`;

interface StyledInputProps {
    $hasStartAdornment: boolean;
    $hasEndAdornment: boolean;
}

const StyledInput = styled.input<StyledInputProps>`
    width: 20rem;
    height: ${({theme}) => theme.layout.btnHeight};
    padding: 0.25rem 1rem;
    padding-left: ${({$hasStartAdornment}) => ($hasStartAdornment ? '2.5rem' : '1rem')};
    padding-right: ${({$hasEndAdornment}) => ($hasEndAdornment ? '2.5rem' : '1rem')};
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0.5rem 0;
`;

const StartAdornment = styled(Icon)`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 100%;
    padding: 0.5rem;
`;

const EndAdornment = styled(StartAdornment)`
    left: auto;
    right: 0;
`;

const Input = ({startAdornment, endAdornment, ...rest}: InputProps): ReactElement => {
    return (
        <InputContainer>
            <StyledInput {...rest} $hasStartAdornment={!!startAdornment} $hasEndAdornment={!!endAdornment} />
            {startAdornment && <StartAdornment icon={startAdornment} />}
            {endAdornment && <EndAdornment icon={endAdornment} />}
        </InputContainer>
    );
};

export default Input;
