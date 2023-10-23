// importing mongoose library //ODM
const mongoose = require("mongoose");

//initiating a connection to mongoDB
mongoose.connect("mongodb://127.0.0.1:27017/my-contacts");



// creates a reference to mongoose db connection and db variable will be used for event listeners.
const db = mongoose.connection;

// if any error during connection with db
//here binding is used fro more control over the error handling and console is used for the current context .

// db.on('error', console.error.bind(console, "Can not connect to Database"));

// can be used this also
db.on("error", () => {
  console.log("Can not connect to Database");
});

// successful connection
db.on("open", () => {
  console.log("Successfully Connected To Database");
});
