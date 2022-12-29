import React, {ReactElement} from 'react';
import Button from '../../elements/Button';
import {FormStyled} from './styles';

interface FormProps {
    handleSubmit: () => void;
    children: any;
}

const Form = ({handleSubmit, children}: FormProps): ReactElement => {
    return (
        <FormStyled>
            {children}
            <Button
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                Submit
            </Button>
        </FormStyled>
    );
};

export default Form;
