// Importing mongoose library //Object Data Model
const mongoose = require("mongoose");

// Initiating a connection to mongoDB
mongoose.connect("mongodb://127.0.0.1:27017/contacts-db");

// creates a refernce to mongoose database connection and db will be used for event litners.
const db = mongoose.connection;

// if any error during connection with db
db.on("error", console.error.bind(console, "Can not connect to Database"));

// in successful connection
db.on("open", () => {
  console.log("Successfully Connected To Database");
});
