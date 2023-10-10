import express from 'express';
import { createContact, getContacts, deleteContact, updateContact } from './db/contacts';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

const BASE_URL = 'http://localhost:3001';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

app.post('/contacts', upload.single('picture'), async (req, res) => {
  const contactData = {
    ...req.body,
    picture: req.file ? `/uploads/${req.file.filename}` : null,
  };

  try {
    const result = await createContact(contactData);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

app.get('/contacts', async (req, res) => {
  const contacts = await getContacts();
  const contactsWithPictureUrls = contacts.map((contact) => ({
    ...contact,
    picture: contact.picture ? `${BASE_URL}${contact.picture}` : null,
  }));
  res.status(200).json(contactsWithPictureUrls);
});


app.patch('/contacts/:id', upload.single('picture'), async (req, res) => {
  const contactId = req.params.id;
  // console.log(req.body)
  // if (req.body.picture) {
  //   const urlParts = req.body.picture.split('/')
  //   const fileName = urlParts[urlParts.length - 1];

  //   const filePath = path.join('/uploads', fileName);

  //   console.log('filePath', filePath)

  //   fs.promises.access(filePath, fs.constants.F_OK)
  //   .then(() => {
  //     // File exists in the uploads directory
  //     console.log(`File ${fileName} exists in the uploads directory.`);
  //   })
  //   .catch(() => {
  //     // File does not exist in the uploads directory
  //     console.error(`File ${fileName} does not exist in the uploads directory.`);
  //   });
  // }


  const updatedContactData = {
    ...req.body,
    picture: req.file ? `/uploads/${req.file.filename}` : req.body.picture ? `/uploads/${req.body.picture?.split('/')[req.body.picture?.split('/').length - 1]}` : null,
  };


  try {
    const result = await updateContact(contactId, updatedContactData);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

app.delete('/contacts/:id', async (req, res) => {
  const result = await deleteContact(req.params.id);
  res.status(200).json(result);
});

app.listen(3001, () => console.log("Server is running on port 3001"));