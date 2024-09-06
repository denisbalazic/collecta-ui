import React, {Children, isValidElement, PropsWithChildren, ReactElement} from 'react';
import Button from '../elements/Button';
import {FormStyled} from './Form.style';
import Field from './Field';
import Checkbox from './Checkbox';

export interface FormFieldProps<T extends string | number | boolean = string | number | boolean> {
    name: string;
    value?: T;
    onChange?: (name: string, value: T) => void;
    errorMsg?: string[];
}

const enhanceableFields = [Field, Checkbox];

interface FormProps {
    formState?: Record<string, string | number | boolean>;
    onFormChange?: React.SetStateAction<any>;
    error?: Record<string, string[]>;
    onSubmit: () => void;
}

/**
 * Form component renders a form with submit button and can enhance field functionality if 'formState' and 'onFormChange' are provided.
 *
 * It will provide field components with values and onChange handlers based on their 'name' prop ('name' corresponds to property of formState object).
 * It will update the formState on change.
 * If error is provided, it will provide fields with the error messages.
 *
 * Fields that can be enhanced: Field, Checkbox.
 *
 * @component
 * @param {Record<string, string | number>} formState - The form state.
 * @param {React.SetStateAction<any>} onFormChange - The form change handler, needs to be passed setter to form state.
 * @param {Record<string, string[]>} error - The form error.
 * @param {() => void} onSubmit - The submit handler.
 */
const Form = ({formState, onFormChange, error, onSubmit, children}: PropsWithChildren<FormProps>): ReactElement => {
    const checkAllowedFields = (type: string | React.JSXElementConstructor<unknown>): boolean =>
        enhanceableFields.some((field) => field === type);

    const enhanceFields = (): ReactElement[] =>
        Children.map(children, (child): ReactElement => {
            if (
                isValidElement<FormFieldProps>(child) &&
                checkAllowedFields(child.type) &&
                child.props.name &&
                formState
            ) {
                return React.cloneElement(child, {
                    value: child.props.value || formState[child.props.name],
                    onChange: (name: string, value: string | number | boolean): void => {
                        child.props.onChange && child.props.onChange(name, value);
                        onFormChange({...formState, [name]: value});
                    },
                    errorMsg: child.props.errorMsg || (error && error[child.props.name]),
                });
            }
            return child as ReactElement;
        }) ?? [];

    return (
        <FormStyled>
            {formState && onFormChange ? enhanceFields() : children}
            <Button
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                Submit
            </Button>
        </FormStyled>
    );
};

export default Form;
