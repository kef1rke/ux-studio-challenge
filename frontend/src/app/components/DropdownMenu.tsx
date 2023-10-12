import React, { useState } from "react";
import styles from "./components.module.css";
import LabelButton from "./LabelButton";
import { svgs } from "./svgs";
import ModalForm from "./ModalForm";
import { deleteContact } from "../api/DataFetcher";
import { Contact } from "../types";

interface DropdownMenuProps {
	closeDropdown: () => void;
	openModal: () => void;
	contactData: Contact;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
	closeDropdown,
	openModal,
	contactData,
}) => {
	const handleEditClick = () => {
		openModal();

		closeDropdown();
	};

	const handleDeleteClick = async () => {
		if (contactData.id) {
			try {
				await deleteContact(contactData.id);
			} catch (error) {
				console.error("Error deleting contact:", error);
			}

			closeDropdown();
		}
	};

	const handleFavouriteClick = () => {
		closeDropdown();
	};

	return (
		<div className={styles.dropdown}>
			<div className={styles.dropdownContent}>
				<LabelButton
					customClass={styles.dropdownButton}
					onClick={handleEditClick}
					shape="shapeless"
					label="Edit"
					icon={svgs.settings}
				/>
				<LabelButton
					customClass={styles.dropdownButton}
					onClick={handleFavouriteClick}
					shape="shapeless"
					label="Favourite"
					icon={svgs.favourite}
				/>
				<LabelButton
					customClass={styles.dropdownButton}
					onClick={handleDeleteClick}
					shape="shapeless"
					label="Remove"
					icon={svgs.delete}
				/>
			</div>
		</div>
	);
};

export default DropdownMenu;
