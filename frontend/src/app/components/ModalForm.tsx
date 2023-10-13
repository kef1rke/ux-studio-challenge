// components/Form.tsx
import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import InputField from "./InputField";
import styles from "./components.module.css";
import { addContact, updateContact } from "../api/DataFetcher";
import ProfileSelector from "./ProfileSelector";
import LabelButton from "./LabelButton";
import { Contact } from "../types";

interface ModalFormProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    type: "add" | "edit";
    profileData?: Contact;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    picture: string | File | null;
}

const ModalForm: React.FC<ModalFormProps> = ({
    isOpen,
    onClose,
    title,
    type,
    profileData,
}) => {
    if (!isOpen) {
        return null;
    }

    const [isLoading, setisLoading] = useState(false);

    const { control, handleSubmit } = useForm<FormData>({
        defaultValues: {
            name: profileData?.name || "",
            email: profileData?.email || "",
            phone: profileData?.phone || "",
            picture: profileData?.picture || null,
        },
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setisLoading(true);

        const contactId = profileData?.id;
        try {
            const contactData = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                picture: data.picture,
            };
            const response = type == "edit" && contactId ? updateContact(contactId, contactData) : await addContact(contactData);

            if (response.success = true) {
                setisLoading(false);
                onClose();
            }
        } catch (error) {
            console.error("Failed to add contact:", error);
        }
    };

    return (
        <div className={styles.modalBackdrop}
            onClick={onClose}
        >
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2>{title}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="picture"
                        control={control}
                        render={({ field }) => (

                            <ProfileSelector
                                onFileUpload={(file) => {
                                    field.onChange(file)
                                }}
                                defaultValue={field.value}
                            />

                        )}
                    />
                    <Controller

                        name="name"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <InputField
                                type="text"
                                id="name"
                                placeholder="Jamie Wright"
                                label="Name"
                                name="name"
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e);
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="phone"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <InputField
                                type="text"
                                id="phone"
                                placeholder="+01 234 5678"
                                label="Phone number"
                                name="phone"
                                value={field.value}
                                onChange={(e) => {
                                    const numericValue = e.target.value.replace(/[^\d\+]/g, '');
                                    field.onChange(numericValue)
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <InputField
                                type="text"
                                id="email"
                                placeholder="jamie.wright@mail.com"
                                label="Email address"
                                name="email"
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e);
                                }}
                            />
                        )}
                    />

                    <div className={styles.buttonHolder}>
                        <LabelButton
                            customClass={styles.buttonWithMargin}
                            color="ghost"
                            onClick={onClose}
                            label="Cancel"
                        />
                        <LabelButton label="Done" isLoading={isLoading} type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalForm;
