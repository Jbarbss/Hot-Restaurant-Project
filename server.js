const express = require("express");
const path = require("path");

const reservationList = [];
const waitList = [];

const app = express();
const PORT = 3000;

function Table(name, phoneNumber, email, id) {
  this.name = name;
  this.phoneNumber = phoneNumber;
  this.email = email;
  this.id = id;
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
