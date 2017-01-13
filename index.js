const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportGithub2 = require('passport-github2');
const cors = require('cors');

const config = require('./config.json');

const app = express();
const port = config.port;

app.use(bodyParser.json());
app.use(cors());




app.listen(port, ()=>{
  console.log('it is ALIVE!! on ' + port);
});
