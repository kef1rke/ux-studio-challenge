import React, { ReactNode, useState } from "react";
import Link from "next/link";
import styles from "./components.module.css";

interface CustomInputProps {
  type: string;
  placeholder: string;
  id: string;
  label: string;
  name: string;
  defaultValue?: string;
}

const InputField: React.FC<CustomInputProps> = ({
  type,
  id,
  placeholder,
  label,
  name,
  defaultValue,
}) => {
  const [value, setValue] = useState(defaultValue || "");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
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
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputField;
