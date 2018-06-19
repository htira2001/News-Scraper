// Dependencies //
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Requiring Note and Article models //
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

// Scraping tools //
var request = require("request");
var cheerio = require("cheerio");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

var PORT = process.env.PORT || 3030;

// Initialize Express //
var app = express();

// Use morgan and body parser //
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Serve static content //
app.use(express.static("public"));

// Set Handlebars //
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main", extname: "handlebars"}));
app.set("view engine", "handlebars");

// Import routes and give the server access to them //
var routes = require("./controllers/scraperController.js");

app.use("/", routes);

mongoose.connect("mongodb://heroku_crz4h42v:3o1t5v45rkce0gicn41uv99fa2@ds159100.mlab.com:59100/heroku_crz4h42v");

var db = mongoose.connection;

// Show any mongoose errors //
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message //
db.once("open", function() {
  console.log("Mongoose connection is successful.");
});

// Listen on port 3030
app.listen(PORT, function() {
  console.log("App running on PORT " + PORT + "!" + " Press CTRL + C to stop.");
});
