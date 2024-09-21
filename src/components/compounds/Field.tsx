import React, {ReactElement} from 'react';
import {FieldMessageStyled, FieldStyled, InputLabelStyled, InputStyled} from './Field.style';
import {FormFieldProps} from './Form';

interface FieldProps extends FormFieldProps<string | number> {
    label?: string;
    placeholder?: string;
    testId?: string;
}

const Field = ({label, name, placeholder, value, onChange, errorMsg, testId}: FieldProps): ReactElement => {
    const hasError = errorMsg && errorMsg.length > 0;

    return (
        <FieldStyled>
            {label && (
                <InputLabelStyled htmlFor={name} $hasError={hasError}>
                    {label}
                </InputLabelStyled>
            )}
            <InputStyled
                id={name}
                type="text"
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange && onChange(name, e.target.value)}
                $hasError={hasError}
                data-test={testId}
            />
            <FieldMessageStyled $hasError={hasError} data-test={`${testId}${hasError ? '--error' : '--noError'}`}>
                {errorMsg?.join(', ')}
            </FieldMessageStyled>
        </FieldStyled>
    );
};

export default Field;
