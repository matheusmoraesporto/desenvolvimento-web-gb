const express = require('express');

const Filter = require('../models/Filter');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        const filter = await Filter.create(req.body);

        return res.send({ filter });
    }
    catch (err) {
        console.log(err);

        return res.status(400).send({ error: 'Error on save entity' })
    }
});

module.exports = app => app.use('/filter', router); 