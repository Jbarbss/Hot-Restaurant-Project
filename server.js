var bodyParser = require("body-parser");
var path = require("path");
const express = require('express');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Storing all the tables
var data = {
	reservations: [],
	waitlist: [],
};

var visitorCount = 0;

// Routing
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
  visitorCount++;
});

app.get("/reserve.html", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables.html", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Get reservation data via the api
app.get("/api/.html", function(req, res) {
  res.json(data.reservations);
});

app.get("/api/waitlist.html", function(req, res) {
  res.json(data.waitlist);
});

// Returns both the tables array and the waitlist array
app.get("/api/", function(req, res) {
  res.json(data);
});

app.get("/api/clear", function(req, res) {
  data.reservations.length = 0;
  data.waitlist.length = 0;
  res.json(data);
});

app.get("/api/visitors", function(req, res) {
  res.json(visitorCount);
});

// Get new table data entry from POST
app.post("/api/new", function(req, res) {
  var tableData = req.body;
  console.log(tableData);
  if (tableData && tableData.name) {
  	tableData.routeName = tableData.name.replace(/\s+/g, "").toLowerCase();
  }
  console.log(tableData);

  if (data.reservations.length < 5) {
  	data.reservations.push(tableData);
  } else {
  	data.waitlist.push(tableData);
  }
  

  res.json(tableData);
});


// Start the Server
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});