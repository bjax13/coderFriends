const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');


const app = express();
const port = 3000;


app.listen(port, () =>{
  console.log('it is ALIVE!! on ' + port);
});