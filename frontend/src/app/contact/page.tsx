"use client";
import Nav from "./components/Nav";
import styles from "./contact.module.css";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LabelButton from "../components/LabelButton";
import ContactListItem from "../components/ContactListItem";
import { fetchAllContacts, addContact } from "../api/DataFetcher";
import { svgs } from "../components/svgs";
import { Contact } from "../types";
import Spinner from "../components/loader/Spinner";

const Contact = () => {
    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    const [contacts, setContacts] = useState<Contact[] | null>(null);

    async function loadContact() {
        try {
            const contactData = await fetchAllContacts();
            setContacts(contactData);
        } catch (error) {
            console.error("Error fetching contact data:", error);
        }
    }

    useEffect(() => {
        loadContact();
    }, []);

    return (
        <main className={styles.main}>
            <div className={styles.gridContainer}>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>

                <div className={styles.gridItem}>
                    <LabelButton color="ghost" shape="justIcon" onClick={goBack}>
                        {svgs.backArrow}
                    </LabelButton>
                </div>
                <div className={styles.gridItem}>
                    <Nav loadContact={loadContact} />
                </div>
                <div className={styles.gridItem}>
                    <LabelButton color="ghost" shape="justIcon" icon={svgs.lightMode} />
                </div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}>
                    {contacts ? (
                        Array.isArray(contacts) && contacts.length > 0 ? (
                            contacts.map((contact) => (
                                <ContactListItem
                                    loadContact={loadContact}
                                    contactData={contact}
                                    key={contact.id}
                                />
                            ))
                        ) : (
                            <p>No Contacts</p>
                        )
                    ) : (
                        <div className={styles.spinnerContainer}>
                            <Spinner customClass={styles.spinner} />
                        </div>
                    )}
                </div>
                <div className={styles.gridItem}></div>
            </div>
        </main>
    );
};

export default Contact;
