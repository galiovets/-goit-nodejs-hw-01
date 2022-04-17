const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId);

  if (!result) {
    return null;
  }

  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === contactId);

  if (idx === -1) {
    return null;
  }

  const filteredContacts = contacts.filter(
    (_, index) => index !== idx,
  );
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));

  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
