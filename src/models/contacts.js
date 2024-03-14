const { v4: uuidv4 } = require("uuid");
const path = require("path")
const fs = require("node:fs").promises;

const URL_CONTACTS = path.join(__dirname, 'contacts.json');
const ENCODING = "utf-8";

const listContacts = async () => {
  try {
    const data = await fs.readFile(URL_CONTACTS, ENCODING);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.error("Error al listar los contactos:", err);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(URL_CONTACTS, ENCODING);
    const allContacts = JSON.parse(data);
    const contact = allContacts.find((c) => c.id === contactId);
    if (!contact) return null
    return contact;
  } catch (err) {
    console.error(err);
    return null
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(URL_CONTACTS, ENCODING);
    const allContacts = JSON.parse(data);
    const isExtist = allContacts.some((c) => c.id === contactId);
    if (isExtist) {
      const updateContacts = allContacts.filter((c) => c.id !== contactId);
      await fs.writeFile(URL_CONTACTS, JSON.stringify(updateContacts, null, 2));
      return true;
    }
    throw new Error("Contact not found");
  } catch (err) {
    console.error(err);
    return false;
  }
};

const addContact = async (body) => {
  try {
    const data = await fs.readFile(URL_CONTACTS, ENCODING);
    const allContacts = JSON.parse(data);
    const newContact = { id: uuidv4(), ...body };
    const addNewContact = [...allContacts, newContact];
    await fs.writeFile(URL_CONTACTS, JSON.stringify(addNewContact, null, 2));
    return newContact;
  } catch (err) {
    console.error(err);
  }
};

const updateContact = async (contactId, update) => {
  try {
    const data = await fs.readFile(URL_CONTACTS, ENCODING);
    const allContacts = JSON.parse(data);
    const isExtist = allContacts.some((c) => c.id === contactId);
    if (!isExtist) throw new Error("Contact not found");
    const modifiedContact = allContacts.map((c) => {
      if (contactId === c.id) {
        if (update.name) c.name = update.name;
        if (update.email) c.email = update.email;
        if (update.phone) c.phone = update.phone;
      }
      return c;
    });
    await fs.writeFile(URL_CONTACTS, JSON.stringify(modifiedContact, null, 2));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
