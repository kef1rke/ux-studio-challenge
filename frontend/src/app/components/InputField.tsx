import React, { ChangeEvent, forwardRef } from "react";
import styles from "./components.module.css";

interface CustomInputProps {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    type: string;
    placeholder: string;
    id: string;
    label: string;
    name: string;
    defaultValue?: string | number;
    value?: string | number;
    required?: boolean;
    inputRef?: React.Ref<HTMLInputElement>;
}

const InputField = forwardRef<HTMLInputElement, CustomInputProps>(
    (
        {
            type,
            id,
            placeholder,
            label,
            name,
            value: inputValue,
            onChange,
            required = false,
            inputRef,
        },
        ref
    ) => {
        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
                onChange(event);
            }
        };

        return (
            <div className={styles.inputField}>
                <label htmlFor={id}>{label}</label>
                <input
                    ref={(inputRef as React.RefObject<HTMLInputElement>) || ref}
                    id={id}
                    className={styles.input}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={inputValue as string}
                    onChange={handleChange}
                    required={required}
                />
            </div>
        );
    }
);

export default InputField;
