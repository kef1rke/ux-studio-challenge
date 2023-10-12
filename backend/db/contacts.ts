import path from 'path';
import knex from './knex';
import fs from 'fs';

interface Contact {
    name: string;
    email: string;
    phone: string;
    picture: Buffer;
}

export const createContact = async (contactData) => {
    try {
        const insertData = {} as { name?: string, email?: string, phone?: string, picture?: string };

        const required = []


        if (contactData.name) {
            insertData.name = contactData.name;
        }
        else {
            required.push('name');
        }

        if (contactData.email) {
            insertData.email = contactData.email;
        }
        else {
            required.push('email');
        }

        if (contactData.phone) {
            insertData.phone = contactData.phone;
        }
        else {
            required.push('phone');
        }

        if (contactData.picture) {
            insertData.picture = contactData.picture;
        }

        if (required.length == 0) {
            const [contactId] = await knex('users').insert(insertData);

            if (contactId) {
                console.log('Contact created successfully');
                return { success: true };
            }
            else {
                return { success: false };

            }

        } else {
            console.log('Not enought contact data provided. Skipping insert.');
            return { "required": required };
        }
    } catch (error) {
        console.error('Error creating contact:', error);
        throw error;
    }
};



export const getContacts = async (): Promise<Contact[]> => {
    try {
        const contacts = await knex('users').select('*');
        return contacts;
    } catch (error) {
        console.error('Error getting contacts:', error);
        return [];
    }
};

export const deleteContact = async (id: number): Promise<{ success: boolean }> => {
    try {
        const contact = await knex('users').where({ id }).first();

        if (contact) {
            if (contact.picture) {
                const filePath = path.join(__dirname, '..', `uploads/${contact.picture}`);
                fs.unlinkSync(filePath);
            }

            await knex('users').where({ id }).del();
            console.log('Contact deleted successfully');

            return { success: true };
        } else {
            console.error('Contact not found');
        }
    } catch (error) {
        console.error('Error deleting contact:', error);
    }
};


export const updateContact = async (contactId: number, updatedData: Contact): Promise<{ success: boolean }> => {
    try {

        const oldPicture = await knex('users')
            .select('picture')
            .where({ id: contactId })

        if (oldPicture[0].picture != updatedData.picture && oldPicture[0].picture != null) {
            const filePath = path.join(__dirname, '..', `uploads/${oldPicture[0].picture}`);
            fs.unlinkSync(filePath);
        }

        const result = await knex('users')
            .where({ id: contactId })
            .update(updatedData);

        console.log('result: ', result);

        if (result) {
            console.log('Contact updated successfully');
            return { success: true };
        } else {
            console.error('Contact not found or update failed');
            return { success: false };
        }
    } catch (error) {
        console.error('Error updating contact:', error);
        throw error;
    }
};
