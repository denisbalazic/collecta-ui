import React, {ReactElement} from 'react';
import {FormFieldProps} from './Form';
import {CheckboxInputStyled, CheckboxLabelStyled, CheckboxStyled} from './Checkbox.style';

interface CheckboxProps extends FormFieldProps<boolean> {
    label: string | ReactElement;
}

const Checkbox = ({name, label, value, onChange, errorMsg}: CheckboxProps): ReactElement => {
    const hasError = errorMsg && errorMsg.length > 0;

    return (
        <CheckboxStyled $hasError={hasError}>
            <CheckboxInputStyled
                id={name}
                name={name}
                type="checkbox"
                checked={value}
                onChange={(e) => onChange && onChange(name, e.target.checked)}
            />
            <CheckboxLabelStyled htmlFor={name}>{label}</CheckboxLabelStyled>
        </CheckboxStyled>
    );
};

export default Checkbox;
