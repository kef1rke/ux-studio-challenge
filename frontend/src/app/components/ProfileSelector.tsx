import LabelButton from "./LabelButton";
import styles from "./components.module.css";
import { useRef, useState, ReactElement } from "react";
import { svgs } from "./svgs";

interface ProfileSelectorProps {
  onFileUpload: (file: File | null) => void; // Updated the type of onFileUpload to accept null
  label: string;
  icon: ReactElement;
  type: "add" | "edit";
  defaultValue?: string;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({
  onFileUpload,
  label,
  icon,
  type,
  defaultValue,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement> | null
  ) => {
    const file = event?.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileUpload(file);
    }
  };

  return (
    <div className={styles.profileSelectorHolder}>
      <img
        className={styles.picture}
        src={
          type === "add"
            ? selectedFile
              ? URL.createObjectURL(selectedFile)
              : "/profiledefault.png"
            : selectedFile
            ? URL.createObjectURL(selectedFile)
            : defaultValue
        }
        alt="current_profile_picture"
      />

      <LabelButton
        onClick={handleClick}
        icon={icon}
        label={label}
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
      {type === "edit" ? (
        <LabelButton
          type="button"
          shape="justIcon"
          icon={svgs.delete}
        ></LabelButton>
      ) : null}
    </div>
  );
};

export default ProfileSelector;
