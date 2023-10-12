import { Contact } from "../types";

const API_URL = 'http://localhost:3001';



export async function fetchAllContacts(): Promise<Contact[]> {
    const response = await fetch(`${API_URL}/contacts`);
    if (!response.ok) {
        throw new Error('Failed to fetch contacts');
    }
    const data = await response.json();
    return data;
}

export async function addContact(contactData: any) {
    const formData = new FormData();
    formData.append("name", contactData.name);
    formData.append("email", contactData.email);
    formData.append("phone", contactData.phone);
    formData.append("picture", contactData.picture);

    const response = await fetch(`${API_URL}/contacts`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Failed to add contact");
    }

    const addedContact = await response.json();
    return addedContact;
}

export async function updateContact(contactId: number, contactData: any) {
    const formData = new FormData();
    formData.append("name", contactData.name);
    formData.append("email", contactData.email);
    formData.append("phone", contactData.phone);
    formData.append("picture", contactData.picture);

    const response = await fetch(`${API_URL}/contacts/${contactId}`, {
        method: "PATCH",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Failed to update contact");
    }

    const updatedContact = await response.json();
    return updatedContact;
}

export async function deleteContact(id: number): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/contacts/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete contact');
        }

        console.log('Contact deleted successfully');
    } catch (error) {
        console.error('Error deleting contact:', error);
    }
}



