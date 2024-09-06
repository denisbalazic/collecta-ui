import React, {ReactElement} from 'react';
import {FieldMessageStyled, FieldStyled, InputLabelStyled, InputStyled} from './Field.style';

export interface FieldProps {
    name: string;
    value?: string | number;
    label?: string;
    placeholder?: string;
    errorMsg?: string[];
    onChange?: (name: string, value: string | number) => void;
}

const Field = ({label, name, placeholder, value, onChange, errorMsg}: FieldProps): ReactElement => {
    return (
        <FieldStyled>
            {label && <InputLabelStyled htmlFor={name}>{label}</InputLabelStyled>}
            <InputStyled
                id={name}
                type="text"
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange && onChange(name, e.target.value)}
            />
            {errorMsg && <FieldMessageStyled>{errorMsg}</FieldMessageStyled>}
        </FieldStyled>
    );
};

export default Field;
