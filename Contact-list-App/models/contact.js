// creating an instance of mongoose ODM
const mongoose = require('mongoose');

// creating a template for collection.
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;