const express = require("express");
const path = require("path");
const port = 7600;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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
  res.render('home', {
    contact_list: contacts,
  })
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Successful Connection");
});
