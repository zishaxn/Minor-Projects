// setting up server requirements
const { log } = require("console");
const express = require("express");
const path = require("path");
const port = 7600;

// connecting db instance with the mongoDb confihurations
const db = require('./config/mongoose');

// deefining instance for contacts db.
const Contact = require('./models/contact')

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

app.post("/", (req, res) => {
  contacts.push(req.body);
  console.log("Added", req.body);
  //here we will get the form data back from the request(as user is making request from their side)
  // and then that request will have body in which there will be data in the decoded form.
  // And we are pushing it into the contact list array.
  return res.redirect("back");
});

// for deleting the entries in contact list
app.get("/delete-contact", (req, res) => {
  let returnedPhone = req.query.phone;
  let matchedIndex = contacts.findIndex(
    (contact) => contact.phone == returnedPhone
  );
  if (matchedIndex != -1) {
    console.log(`Deleted: ,
     ${contacts[matchedIndex].name} : ${contacts[matchedIndex].phone}`);
    contacts.splice(matchedIndex, 1);
  }
  return res.redirect("back");
});

// app.get("/delete-contact", (req, res) => {
//   let phoneReturned = req.query.phone;
//   let contactIndex = contacts.findIndex(
//     (contact) => contact.phone == phoneReturned
//   );
//   if (contactIndex != -1) {
//     contacts.splice(contactIndex, 1);
//   }
//   return res.redirect("back");
// });

var contacts = [
  {
    name: "zishan",
    phone: "8291533333",
  },
  {
    name: "han",
    phone: "8666533333",
  },
  {
    name: "ishan",
    phone: "1755533333",
  },
  {
    name: "zian",
    phone: "22222333",
  },
];

app.get("/", (req, res) => {
  res.render("home", {
    contact_list: contacts,
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Successful Connection");
});
