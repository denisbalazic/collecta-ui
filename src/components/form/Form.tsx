import React from 'react';

interface FormProps {
    title?: string;
    handleSubmit: () => void;
    children: any;
}

const Form = ({title, handleSubmit, children}: FormProps) => {
    return (
        <form>
            <h4>{title}</h4>
            {children}
            <button
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                Submit
            </button>
        </form>
    );
};

export default Form;
