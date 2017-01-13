const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const GithubStratagy = require('passport-github2').Strategy;
const cors = require('cors');

const config = require('./config.json');

const app = express();
const port = config.port;

app.use(bodyParser.json());
app.use(cors());

app.use(session({
  secret: config.secret,
  saveUninitialized: false,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + "/public"));





app.listen(port, ()=>{
  console.log('it is ALIVE!! on ' + port);
});
