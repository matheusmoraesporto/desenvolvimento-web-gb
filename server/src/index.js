const express = require('express');

// Utiliza o cors, pois o client executa no localhost:3000 e o server no localhost:3333, sendo assim, permite chamadas externas.
// Também é necessário para as chamadas do firebase e api do cep.
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