// Dependencies //

var express = require("express"); 
var bodyParser = require("body-parser"); 
var mongoose = require("mongoose"); 
var request = require("request"); 
var exhbs = require("express-handlebars");
var logger = require("morgan"); 

// Scraping tools //

var axios = require("axios"); 
var cheerio = require("cheerio"); 

// Require all models //

var db = require("./models"); 

var PORT = 3000; 

// Initialize Express //

var app = express(); 

// Configure middleware //

// Use morgan logger for logging requests // 
app.use(logger("dev"));

// Use body-parser for handling form submissions // 
app.use(bodyParser.urlencoded({ extended: true }));

// Use express.static to serve the public folder as a static directory // 
app.use(express.static("public")); 

// If deployed, use the deployed database. Otherwise use the local database. //

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/News-Scraper";

// Set mongoose to leverage built in JavaScript ES6 promises //

mongoose.Promise = Promise; 
mongoose.connect(MONGODB_URI);

// Connect to the Mongo DB //

mongoose.connect("mongodb://localhost/news-scraper"); 

// Routes //

// A GET route for scraping the New York Times website // 
app.get("/scrape", function(req, res) {
    // First grab the body of the html with request // 
    request.get("https://www.nytimes.com/", function(error, response, html) {
        // Then, load into cheerio and save it to $ for a shorthand selector // 
        var $ = cheerio.load(html);

        // Now, grab every story within an article tag, and do the following: 
        $("article.story").each(function(i, element){
            // Save an empty result object // 
            var result = {}; 

    // Add the text, href and summary of every link and save them as properties of the result object // 
            
            result.title = $(element).children("h2").text();
                console.log("This is the result title: " + result.title);

            result.link = $(element).children("h2").children("a").attr("href");
                console.log("This is the link: " + result.link);
    
            result.summary = $(element).children("p.summary").text();
                console.log("This is a summary: " + result.summary);

    
    // Create a new Article using the "result" object built from the scraping //
    db.Article.create(result)
      .then(function(dbArticle) {
          // View the added result in the console //
          console.log(dbArticle)
      })
      .catch(function(err) {
          // If an error occurred, send it to the client //
          return res.json(err);
        });
    });

// If able to successfully scrape and save and Article, send a message to the client //
res.send("Scrape is complete!")
   });
});

// Start the server // 
app.listen(PORT, function() {
    console.log("The app is running on port " + PORT + "!" +   " Press 'control' + 'C' to quit.")
});