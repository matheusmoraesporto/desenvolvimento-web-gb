const express = require('express');

const Product = require('../models/Product');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        console.log(req.body);

        const product = await Product.create(req.body);

        return res.send({ filter: product });
    }
    catch (err) {
        console.log(err);

        return res.status(400).send({ error: 'Error on save entity' });
    }
});

router.get('/list', async (req, res) => {
    try {
        const products = await Product.find();

        return res.json({ products });
    }
    catch (err) {
        console.log(err);

        return res.status(400).send({ error: 'Error on list products' });
    }
});

module.exports = app => app.use('/product', router);