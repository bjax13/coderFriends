const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const GithubStratagy = require('passport-github2').Strategy;
const cors = require('cors');
const massive = require('massive');

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

//setup database connection
const massiveInstance = massive.connectSync({connectionString: 'postgres://localhost/sandbox'});

app.set('db', massiveInstance);
const db = app.get('db');
// end setup of database



passport.use('githubAuth', new GithubStratagy({
  clientID: config.github.client_id,
  clientSecret: config.github.client_secret,
  callbackURL: "http://localhost:3000/auth/github/callback",
  profileFields: ['id', 'displayName']
},
function(accessToken, refreshToken, profile, done) {
  db.getUserByGithub([profile.id], function(err, user) {
    user = user[0];
    if (!user) {
      console.log('CREATING USER');
      db.createUserGithub([profile.displayName, profile.id], function(err, user) {
        return done(err, user, {scope: 'all'});
      });
    } else {
      return done(err, user);
    }
  });
}));

passport.serializeUser(function(user, done) {
  return done(null, user);
});

passport.deserializeUser(function(user, done) {
  return done(null, user);
});



app.listen(port, ()=>{
  console.log('it is ALIVE!! on ' + port);
});


app.get('/auth/github', passport.authenticate('githubAuth'));

app.get('/auth/github/callback',
  passport.authenticate('githubAuth'), function(req, res) {
    res.status(200).redirect('/#/home');
  });
