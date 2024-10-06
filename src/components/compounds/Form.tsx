import React, {Children, isValidElement, PropsWithChildren, ReactElement, useState} from 'react';
import {ZodSchema} from 'zod';
import Button from '../elements/Button';
import {FormStyled} from './Form.style';
import Field from './Field';
import Checkbox from './Checkbox';
import {mapZodToValidationErrors, trimStringProperties} from '../../utils/utils';

export interface FormFieldProps<T extends string | number | boolean = string | number | boolean> {
    name: string;
    value?: T;
    onChange?: (name: string, value: T) => void;
    placeholder?: string;
    errorMsg?: string[];
    disabled?: boolean;
    required?: boolean;
}

const enhanceableFields = [Field, Checkbox];

interface FormProps {
    formState?: Record<string, string | number | boolean>;
    onFormChange?: React.SetStateAction<any>;
    validationSchema?: ZodSchema<any>;
    error?: Record<string, string[]>;
    onSubmit: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    testId?: string;
}

/**
 * Form component renders a form with submit button and can enhance field functionality if 'formState' and 'onFormChange' are provided.
 *
 * It will provide field components with values and onChange handlers based on their 'name' prop ('name' corresponds to property of formState object).
 * It will update the formState on change.
 * If error is provided, it will provide fields with the error messages.
 * It will check if all Fields with 'required' prop are filled before submitting the form.
 *
 * Fields that can be enhanced: Field, Checkbox.
 *
 * @component
 * @param {Record<string, string | number>} formState - The form state.
 * @param {React.SetStateAction<any>} onFormChange - The form change handler, needs to be passed setter to form state.
 * @param {ZodSchema<any>} validationSchema - The form validation schema.
 * @param {Record<string, string[]>} error - The form error.
 * @param {() => void} onSubmit - The submit handler.
 * @param {boolean} [disabled] - The disabled state of the form.
 * @param {boolean} [isLoading] - The loading state of the form, spinner will be shown on submit button.
 * @param {string} [testId] - Id used for testing (ex. cypress).
 */
const Form = ({
    formState,
    onFormChange,
    validationSchema,
    error,
    onSubmit,
    disabled,
    isLoading,
    testId,
    children,
}: PropsWithChildren<FormProps>): ReactElement => {
    const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

    const checkAllowedFields = (type: string | React.JSXElementConstructor<unknown>): boolean =>
        enhanceableFields.some((field) => field === type);

    const enhanceFields = (): ReactElement[] =>
        Children.map(children, (child): ReactElement => {
            if (
                isValidElement<FormFieldProps>(child) &&
                // TODO: Maybe next check is not needed; works without it; check it
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
                    errorMsg:
                        child.props.errorMsg ||
                        validationErrors[child.props.name] ||
                        (error && error[child.props.name]),
                    disabled: child.props.disabled || disabled || isLoading,
                    placeholder: child.props.placeholder || (child.props.required ? '*required' : ''),
                });
            }
            return child as ReactElement;
        }) ?? [];

    const requiredFields = Children.toArray(children)
        .filter(
            (child): child is ReactElement<FormFieldProps> =>
                isValidElement<FormFieldProps>(child) && !!child.props.required
        )
        .map((child) => child.props);

    const requiredFieldsFilled = requiredFields?.every((field) => (formState ? formState[field.name] : field.value));

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const trimmedFormState = trimStringProperties(formState);
        onFormChange && onFormChange(trimmedFormState);

        if (validationSchema) {
            const result = validationSchema.safeParse(trimmedFormState);
            if (!result.success) {
                setValidationErrors(mapZodToValidationErrors(result.error));
                return;
            }
        }
        onSubmit();
    };

    return (
        <FormStyled onSubmit={handleSubmit} data-test={testId}>
            {formState && onFormChange ? enhanceFields() : children}
            <Button
                type="submit"
                disabled={disabled || isLoading || !requiredFieldsFilled}
                spinner={isLoading}
                data-test="form-submit"
            >
                Submit
            </Button>
        </FormStyled>
    );
};
export default Form;
