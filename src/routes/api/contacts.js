const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../db/services/contacts.service");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  console.log(contacts);
  res.status(200).json({ contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const contactID = req.params.contactId;
  const contact = await getContactById(contactID);
  contact
    ? res.status(200).json(contact)
    : res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.query;
  const body = { name, email, phone };
  const newContact = await addContact(body);
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const contactID = req.params.contactId;
  const contact = await removeContact(contactID);
  contact
    ? res.status(200).json({ mensaje: "contacto eliminado" })
    : res.status(404).json({ message: "Not found" });
});

router.put("/:contactId", async (req, res, next) => {
  const contactID = req.params.contactId;
  const query = req.query;
  const isValid = query.name || query.email || query.phone || query.favorite;
  if (!isValid) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, email, phone } = req.query;
  const body = { name, email, phone };
  const update = await updateContact(contactID, body);
  update
    ? res.status(201).json({ message: "updated contact" })
    : res.status(404).json({ message: "missing fields" });
});

module.exports = router;
