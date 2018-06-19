:newspaper: # New York Times Scraper

The New York Times Scraper is an app that scrapes the newest 20 articles from the New York Times website (https://www.newtyorktimes.com) and presents them in a tasteful, clean interface in which the user can click on and comment on individual stories.  

## Technologies I Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- npm packages
    - body-parser
    - express
    - mongoose
    - cheerio
    - axios

## How It Works
- The user scrapes the NYT website by clicking "scrape" on the landing page.
- The articles will populate and users can then see the title, summary, and a link to the original article.
- Users can click anywhere on the article to show a comment box in the right column, where they input a title and the comment and click "save" to save the comment. Users can navigate away from that story and come back and see their comment is saved. 

## Demo

Check out the application at https://obscure-harbor-50970.herokuapp.com/ on Heroku.

### Installation

To install the application, open the terminal or command prompt and run the commands below:

``` Javascript
git clone git@github.com:mariamschaudry/News-Scraper.git
cd News-Scraper
npm install
mongod
```
	
### Running Locally

To run the application locally and access it in your browser, open [server.js](./server.js) in a separate terminal window than the one running *mongod* and run the command below.

``` Javascript
node server.js
```
	
The application will now be running locally in your browser at the URL `http://localhost:3030`.