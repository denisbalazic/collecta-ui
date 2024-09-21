import React, {ReactElement} from 'react';
import {FormFieldProps} from './Form';
import {CheckboxInputStyled, CheckboxLabelStyled, CheckboxStyled} from './Checkbox.style';
import {FieldMessageStyled} from './Field.style';

interface CheckboxProps extends FormFieldProps<boolean> {
    label: string | ReactElement;
    testId?: string;
}

const Checkbox = ({name, label, value, onChange, errorMsg, testId}: CheckboxProps): ReactElement => {
    const hasError = errorMsg && errorMsg.length > 0;

    return (
        <CheckboxStyled $hasError={hasError} data-test={`${testId}${hasError ? '--error' : '--noError'}`}>
            <div>
                <CheckboxInputStyled
                    id={name}
                    name={name}
                    type="checkbox"
                    checked={value}
                    onChange={(e) => onChange && onChange(name, e.target.checked)}
                    data-test={testId}
                />
                <CheckboxLabelStyled htmlFor={name}>{label}</CheckboxLabelStyled>
            </div>
            <FieldMessageStyled $hasError={hasError}>{errorMsg?.join(', ')}</FieldMessageStyled>
        </CheckboxStyled>
    );
};

export default Checkbox;
