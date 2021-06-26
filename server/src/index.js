const express = require('express');

const cors = require('cors');

const bodyParser = require('body-parser');

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://matheusjennifer:imortal99@jmgames.qqtbu.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./controllers/productController')(app);
require('./controllers/userController')(app);

app.listen(3333);