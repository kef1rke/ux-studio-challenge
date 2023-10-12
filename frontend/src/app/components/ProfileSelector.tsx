import React, { useRef, useState, ReactElement } from "react";
import LabelButton from "./LabelButton";
import styles from "./components.module.css";
import { svgs } from "./svgs";

interface ProfileSelectorProps {
    onFileUpload: (file: File | null) => void;
    // onDelete: () => void;
    defaultValue?: File | string | null;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({
    onFileUpload,
    // onDelete,
    defaultValue,
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    // const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
    const [src, setSrc] = useState<string>(defaultValue ? (typeof defaultValue == 'string') ? defaultValue : URL.createObjectURL(defaultValue) : "/profiledefault.png");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // setSelectedFile(file);
            onFileUpload(file);
            setSrc(URL.createObjectURL(file))
        }
    };

    const handleDelete = () => {
        // setSelectedFile(undefined);
        onFileUpload(null);
        // onDelete();
        setSrc("/profiledefault.png")
    };

    return (
        <div className={styles.profileSelectorHolder}>
            <img
                key={defaultValue ? 'selected' : 'default'}
                className={styles.picture}
                src={src}
                alt="current_profile_picture"
            />
            <LabelButton
                onClick={() => inputRef.current?.click()}
                icon={defaultValue ? svgs.edit : svgs.add}
                label={defaultValue ? "Change picture" : "Add picture"}
                type="button"
                customClass={styles.buttonWithMargin}
            >
                <input
                    type="file"
                    ref={inputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    id="fileInput"
                    name="fileInput"
                />
            </LabelButton>

            {(defaultValue) ? (

                <LabelButton
                    type="button"
                    shape="justIcon"
                    icon={svgs.delete}
                    onClick={handleDelete}
                ></LabelButton>
            ) : null}
        </div>
    );
};

export default ProfileSelector;
