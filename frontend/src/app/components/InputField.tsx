import React from "react";
import styles from "./components.module.css";

interface CustomInputProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder: string;
  id: string;
  label: string;
  name: string;
  defaultValue?: string | number; // Allow both string and number
  value?: string | number;
}

const InputField: React.FC<CustomInputProps> = ({
  type,
  id,
  placeholder,
  label,
  name,
  value: inputValue,
  onChange,
}) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className={styles.inputField}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={styles.input}
        type={type}
        placeholder={placeholder}
        name={name}
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputField;
