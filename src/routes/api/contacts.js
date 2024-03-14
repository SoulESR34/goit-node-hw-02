const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");

const router = express.Router();
const contactSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().min(10).optional(),
});



router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
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
  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ message: "missing required name, email or phone field" });
  }

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
  const { error } = contactSchema.validate(req.query);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  console.log("qr:", req.query,  !contactSchema.validate(req.query))
  const { name, email, phone } = req.query;
  const body = { name, email, phone };
  const update = await updateContact(contactID, body);
  update
    ? res.status(201).json({ message: "updated contact" })
    : res.status(404).json({ message: "missing fields" });
});

module.exports = router;
