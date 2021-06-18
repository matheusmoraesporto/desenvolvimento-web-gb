const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    console.log('ok');
    res.send('ok');
});

require('./controllers/filterController')(app);

app.listen(8888);