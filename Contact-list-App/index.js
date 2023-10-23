// setting up server requirements
const { log } = require("console");
const express = require("express");
const path = require("path");
const port = 7600;

// .env

const dotenv = require('dotenv');

dotenv.config({
  path: "./data/config.env"
});

// connecting db instance with the mongoDb confihurations
const db = require("./config/mongoose");

// deefining instance for contacts db.
const Contact = require("./models/contact");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware so that we get name and phone number in a key-value pair format
app.use(express.urlencoded());

// setting up directory for static files for styling & functioning
// Serve static files from the 'assets' directory
app.use(express.static("assets"));
app.use(
  "/assets",
  express.static(path.join(__dirname, "assets"), {
    setHeaders: (res, path, start) => {
      if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);

// add contacts into list
app.post("/", async (req, res) => {
  try {
    const newContact = await Contact.create({
      name: req.body.name,
      phone: req.body.phone,
    });
    console.log("New Contact Created", newContact);
    return res.redirect("back");
  } catch (error) {
    console.error("Could not create Contact", error);
    return res.status(500).send("Internal Server Error");
  }
});

// for deleting the entries in contact list
app.get("/delete-contact", async (req, res) => {
  try {
    const id = req.query.id;
    const result = await Contact.findByIdAndDelete(id);
    console.log("Deleted Contact", result);
    return res.redirect("back");
  } catch (error) {
    console.error("Could not delete contact from list", error);
    return res.status(500).send("Internal Server Error");
  }
});

//route handler that listens for GET requests at the root URL ("/")
// in simple it well display home.ejs(contact-list)
app.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.render("home", {
      contact_list: contacts,
    });
  } catch (error) {
    console.error("Error Fetching Contacts from Database", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Successful Connection On:" ,process.env.PORT);
});
