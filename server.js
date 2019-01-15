// somebody set up us the server
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const moment = require('moment');

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// you got served... the react front-end file
app.use(express.static(path.join(__dirname, '/client/build')));

// routes
app.use(require('./server/config/routes.js'));
app.use(require('./server/config/catch-all.routes.js'));



// main screen turn on
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`*** all your port your port ${port} are belong to us ***`);
});