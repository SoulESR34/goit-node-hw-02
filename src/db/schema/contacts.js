const { mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: {
    type: String,
    minlenght: 2,
    required: [true, "Name is requiered"],
  },
  email: {
    type: String,
    required: [true, "Email is requiered"],
  },
  phone: {
    type: String,
    required: [true, "Phone is requiered"],
  },
  favorite: {
    type: Boolean,
    default: false
  }
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
