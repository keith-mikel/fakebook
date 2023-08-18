# FAKEBOOK

## Safest place your those who are not technologically inclined

Embarrassed by the surreptitious thoughts and opinions you always knew your parents had, but never thought they’d put in cyberspace... Here is a way to allow them to share, without the embarrassment or all the explaining or defending to others.

With FAKEBOOK, your parents can go online to share or vent to others, except ‘others’, are bots or canned responses.

## User Story
As someone whose grandparent posted where their space key was. We wanted to create a space where less tech-savvy people can be taught and learn the dos and don'ts of the a social webspace.

## Installation

Clone the repository via your preferred method. Install npm dependencies ```npm install```. Enter your environment variables into the .env file. Create the database using MySQL and the ```schema.sql``` file. Then the  Database can be seeded using ```node seeds/seeds.js```. Everything should now be in place and you can run the ```node server.js``` or ```npm start```.

## Usage

Once the server is running, the user will be prompted with a login page. If it is the user's first time they must create a new account by clicking on the create new account button. Otherwise, you may log in to your account and proceed to your home page. From the home page users can see their previous posts and make new ones.

## Technology Used 
* HTML
* CSS
* Javascript
* npm sentiment
* handlebars
* sequelize

## Biggest challenge and success

* Challenge: Getting the front end to talk to the back end
* Challenge: Creating generic responses to be put on each post
* Success: Handelbars worked the first time
* Success: Reading the user's posts and getting the general mood of the message

## Authors 
* Keith Mikel
* Benjamin Currier
* Maxwell Leuthner

## Contribution Guidelines

To contribute to the repository make a fork.

## Deployed Page

https://cryptic-sands-55611-230624dc660e.herokuapp.com/login
![Fakebook](/images/Fakebook.PNG)