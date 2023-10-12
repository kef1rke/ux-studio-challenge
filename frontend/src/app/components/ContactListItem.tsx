import React, { useEffect, useRef, useState } from "react";
import LabelButton from "./LabelButton";
import styles from "./components.module.css";
import { svgs } from "./svgs";
import DropdownMenu from "./DropdownMenu";
import ModalForm from "./ModalForm";
import { Contact } from "../types";

interface CustomListItemProps {
    contactData: Contact;
    loadContact: () => void;
}

const ContactListItem: React.FC<CustomListItemProps> = ({
    contactData,
    loadContact,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
        loadContact();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                closeDropdown();
            }
        };

        if (isDropdownOpen) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isDropdownOpen]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
        loadContact();
    };
    const openModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div className={styles.contactHolder}>
            <div className={styles.contactElement}>
                <img
                    className={styles.contactPicture}
                    src={
                        contactData.picture ? contactData.picture : "/profiledefault.png"
                    }
                    alt="profile_picture"
                />
                <div className={styles.contactChild}>
                    <h3>{contactData.name}</h3>
                    <label>{contactData.phone}</label>
                </div>
            </div>

            <div className={styles.actionsHolder}>
                <LabelButton icon={svgs.mute} shape="justIcon" color="ghost" />
                <LabelButton icon={svgs.call} shape="justIcon" color="ghost" />

                {isDropdownOpen && (
                    <div ref={dropdownRef}>
                        <DropdownMenu
                            contactData={contactData}
                            openModal={openModal}
                            closeDropdown={closeDropdown}
                        />
                    </div>
                )}

                <LabelButton
                    icon={svgs.more}
                    onClick={toggleDropdown}
                    shape="justIcon"
                    color="ghost"
                    stayActive={isDropdownOpen}
                />
            </div>

            <ModalForm
                isOpen={isModalOpen}
                onClose={closeModal}
                profileData={contactData}
                title="Add contact"
                type="edit"
            />
        </div>
    );
};

export default ContactListItem;
