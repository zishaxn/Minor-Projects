// Import the 'express' framework.
const express = require("express");
const port = 8000;

// database
const db = require("./config/mongoose");
const Contact = require("./models/contact");

// instance of express application
const app = express();

// working with other source folders and files
const path = require("path");

// setting the views engine as ejs(a template file)
app.set("view engine", "ejs");

// middleware so that we get name and phone number in a key-value pair format
app.use(express.urlencoded());

// setting the path where template files are located
app.set("views", path.join(__dirname, "views"));



//
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

//route handler that listens for GET requests at the root URL ("/")
// in simple it well display home.ejs(contact-list)
app.get("/", async (req, res) => {
  try {
      const contacts = await Contact.find({});
      res.render("home", {
      title: "My Contact List",
      contact_list: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).send("Internal Server Error");
  }
});

// add contacts into list
app.post("/", async (req, res) => {
  try {
    const newContact = await Contact.create({
      name: req.body.name,
      phone: req.body.phone,
    });

    console.log("New contact created:", newContact);
    return res.redirect("back");
  } catch (err) {
    console.error("Error creating a new contact:", err);
    return res.status(500).send("Internal Server Error");
  }
});

// for deleteing the emtries in contact list
app.get("/delete-contact", async (req, res) => {
  try {
    const id = req.query.id;
    const result = await Contact.findByIdAndDelete(id);
    console.log("Deleted contact:", result);
    return res.redirect("back");
  } catch (error) {
    console.error("Error deleting contact:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// if any other url entered then following will be default
app.get("*", (req, res) => {
  res.status(404).send("Not Found");
});

//responsible for starting the server and listening for incoming HTTP requests
app.listen(port, (Error) => {
  if (Error) {
    console.log("Error! Cant Connect To Server");
    return;
  }
  console.log("Server running Successfully :", port);
});
