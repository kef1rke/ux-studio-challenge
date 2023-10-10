import React, { useState, FormEvent } from "react";
import styles from "./components.module.css";
import LabelButton from "./LabelButton";
import InputField from "./InputField";
import ProfileSelector from "./ProfileSelector";
import { svgs } from "./svgs";
import { addContact, updateContact } from "../api/DataFetcher";
import { Contact } from "../types";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: "add" | "edit";
  profileData?: Contact;
}

const ModalForm: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  type,
  profileData,
}) => {
  if (!isOpen) {
    return null;
  }

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const getFieldValue = (field: string, defaultValue: string) => {
    const input = profileData ? profileData[field as keyof Contact] : null;
    return input !== null && input !== undefined ? input : defaultValue;
  };

  const [formData, setFormData] = useState({
    name: getFieldValue("name", ""),
    email: getFieldValue("email", ""),
    phone: getFieldValue("phone", ""),
    picture: profileData?.picture ? profileData.picture : selectedFile ? URL.createObjectURL(selectedFile) : null ,
  });

  const handleDelete = () => {
    // const { name, value } = event.target;
    setSelectedFile(null);
    setFormData(name => ({ ...name, picture: "" }));
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;

    const contactData: any = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      picture: selectedFile || formData.picture,
    };

    const contactId = profileData?.id;

    if (contactData.name && contactData.email && contactData.phone) {
      if (type === "add") {
        try {
          const addedContact = await addContact(contactData);

          form.reset();

          onClose();
        } catch (error) {
          console.error("Error adding contact:", error);
        }
      }
      if (type === "edit" && contactId) {
        try {
          const updatedContact = await updateContact(contactId, contactData);
          form.reset();
          onClose();
        } catch (error) {
          console.error("Error updating contact:", error);
        }
      }
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>

        <form onSubmit={handleSubmit}>
          <ProfileSelector
            onFileUpload={(file) => setSelectedFile(file)}
            defaultValue={formData.picture}
            onDelete={handleDelete}
          />
          <InputField
            label="Name"
            id="name"
            type="text"
            placeholder="Jamie Wright"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <InputField
            label="Phone number"
            id="phone"
            type="text"
            placeholder="+36306543214"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <InputField
            label="Email address"
            id="email"
            type="email"
            placeholder="jamie.wright@mail.com"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <div className={styles.buttonHolder}>
            <LabelButton
              customClass={styles.buttonWithMargin}
              color="ghost"
              onClick={onClose}
              label="Cancel"
            />
            <LabelButton label="Done" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};


export default ModalForm;
