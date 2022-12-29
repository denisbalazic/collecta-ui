import React, {ReactElement} from 'react';
import {FieldMessageStyled, FieldStyled, InputLabelStyled, InputStyled} from './styles';

interface FieldProps {
    name: string;
    value: string | number;
    label?: string;
    placeholder?: string;
    errorMsg?: string;
    handleChange: (name: string, value: string | number) => void;
}

const Field = ({name, value, label, placeholder, errorMsg, handleChange}: FieldProps): ReactElement => {
    return (
        <FieldStyled>
            {label && <InputLabelStyled htmlFor={name}>{label}</InputLabelStyled>}
            <InputStyled
                id={name}
                type="text"
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={(e) => handleChange(name, e.target.value)}
            />
            {errorMsg && <FieldMessageStyled>{errorMsg}</FieldMessageStyled>}
        </FieldStyled>
    );
};

export default Field;
