import React, { useState } from "react";
import ModalForm from "../../components/ModalForm";
import styles from "./contactComponents.module.css";
import LabelButton from "../../components/LabelButton";
import { svgs } from "../../components/svgs";

interface CustomNavProps {
  loadContact: () => void;
}

const Nav: React.FC<CustomNavProps> = ({ loadContact }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    loadContact();
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <h1 className={styles.title}>Contacts</h1>
      </div>
      <div className={styles.right}>
        <div className={styles.child}>
          <LabelButton
            color="ghost"
            icon={svgs.settings}
            shape="justIcon"
          ></LabelButton>
        </div>
        <div className={styles.child}>
          <LabelButton color="ghost" shape="justIcon">
            <img src="/profile.png" alt="profile" className={styles.profile} />
          </LabelButton>
        </div>
        <div className={styles.child}>
          <LabelButton
            shape="primary"
            onClick={openModal}
            label="Add new"
            icon={svgs.plus}
          />
        </div>
      </div>
      <ModalForm
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add contact"
        type="add"
      />
    </nav>
  );
};

export default Nav;
