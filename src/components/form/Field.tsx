import React from 'react';

interface FieldProps {
    name: string;
    value: string | number;
    label?: string;
    placeholder?: string;
    errorMsg?: string;
    handleChange: (name: string, value: string | number) => void;
}

const Field = ({name, value, label, placeholder, errorMsg, handleChange}: FieldProps) => {
    return (
        <div>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                id={name}
                type="text"
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={(e) => handleChange(name, e.target.value)}
            />
            {errorMsg && <p>{errorMsg}</p>}
        </div>
    );
};

export default Field;
