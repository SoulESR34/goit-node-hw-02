const { v4: uuidv4 } = require("uuid");
const fs = require("node:fs").promises;
const Contact = require("../schema/contacts");

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (err) {
    console.error("Error al listar los contactos:", err);
    return null;
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return !contact ?  null : contact;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const removeContact = async (contactId) => {
  try {
    const deleteContact = await Contact.findByIdAndDelete(contactId);
    !deleteContact ? null : true
  } catch (err) {
    console.error(err);
    return null;
  }
};

const addContact = async (body) => {
  try {
    newContact = new Contact({...body})
    const saveContact = await newContact.save();
    return newContact;
  } catch (err) {
    console.error(err);
    return null
  }
};

const updateContact = async (contactId, update) => {
  try {
    const contact = await Contact.findByIdAndUpdate(contactId, update) 
    return contact ? contact : null
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
