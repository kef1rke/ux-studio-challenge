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

    console.log('contactData', contactData)

    if (contactData.name) {
      insertData.name = contactData.name;
    }

    if (contactData.email) {
      insertData.email = contactData.email;
    }

    if (contactData.phone) {
      insertData.phone = contactData.phone;
    }

    if (contactData.picture) {
      insertData.picture = contactData.picture;
    }

    if (Object.keys(insertData).length > 0) {
      const [contactId] = await knex('users').insert(insertData);

      console.log('Contact created successfully');
      return contactId;
    } else {
      console.log('No contact data provided. Skipping insert.');
      return null;
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

export const deleteContact = async (id: number): Promise<void> => {
  try {
    const contact = await knex('users').where({ id }).first();

    if (contact) {
      if (contact.picture) {
        const filePath = path.join(__dirname, '..', contact.picture);
        fs.unlinkSync(filePath);
      }

      await knex('users').where({ id }).del();
      console.log('Contact deleted successfully');
    } else {
      console.error('Contact not found');
    }
  } catch (error) {
    console.error('Error deleting contact:', error);
  }
};


export const updateContact = async (contactId, updatedData) => {
  try {
    const result = await knex('users')
      .where({ id: contactId })
      .update(updatedData);

    if (result) {
      console.log('Contact updated successfully');
      return { success: true };
    } else {
      console.error('Contact not found or update failed');
      throw new Error('Contact not found or update failed');
    }
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
};
