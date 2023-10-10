// Modal.tsx

import React, { useState, FormEvent } from "react";
import styles from "./components.module.css"; // You can define your modal styles in a CSS module
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;

    const nameInput = form.querySelector<HTMLInputElement>("#name")?.value
      ? form.querySelector<HTMLInputElement>("#name")?.value
      : profileData?.name;
    const emailInput = form.querySelector<HTMLInputElement>("#email")?.value
      ? form.querySelector<HTMLInputElement>("#email")?.value
      : profileData?.email;
    const phoneInput = form.querySelector<HTMLInputElement>("#phone")?.value
      ? form.querySelector<HTMLInputElement>("#phone")?.value
      : profileData?.phone;
    const pictureInput = selectedFile ? selectedFile : profileData?.picture;
    const contactId = profileData?.id;

    if (nameInput && emailInput && phoneInput) {
      const contactData: any = {
        name: nameInput == "" ? null : nameInput,
        email: emailInput == "" ? null : emailInput,
        phone: phoneInput == "" ? null : phoneInput,
        picture: pictureInput == null ? null : pictureInput,
      };
      if (type == "add") {
        try {
          const addedContact = await addContact(contactData);

          form.reset();

          onClose();
        } catch (error) {
          console.error("Error adding contact:", error);
        }
      }
      if (type == "edit" && contactId) {
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
            onFileUpload={(file) => {
              setSelectedFile(file);
            }}
            type={type}
            label={type == "add" ? "Add picture" : "Change picture"}
            icon={type == "add" ? svgs.add : svgs.edit}
            defaultValue={type == "edit" ? profileData?.picture : ""}
          />
          <InputField
            label="Name"
            id="name"
            type="text"
            placeholder="Jamie Wright"
            name="name"
            defaultValue={type == "edit" ? profileData?.name : ""}
          />
          <InputField
            label="Phone number"
            id="phone"
            type="text"
            placeholder="+36306543214"
            name="phone"
            defaultValue={type == "edit" ? profileData?.phone : ""}
          />
          <InputField
            label="Email address"
            id="email"
            type="email"
            placeholder="jamie.wright@mail.com"
            name="email"
            defaultValue={type == "edit" ? profileData?.email : ""}
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
