const express = require("express");
const path = require("path");
const port = 7600;
const app = express();

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Successful Connection");
});
