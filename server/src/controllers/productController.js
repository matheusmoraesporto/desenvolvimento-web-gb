const express = require('express');
const router = express.Router();

const Cart = require('../models/cart');
const Product = require('../models/Product');

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

router.get('/home', async (req, res) => {
    try {
        const { idUser } = req.query;

        const products = await Product
            .find()
            .sort({
                value: -1
            });

        const cart = await Cart
            .find()
            .where('idUser').equals(idUser);

        return res.json({ products, cart });
    }
    catch (err) {
        console.log(err);

        return res.status(400).send({ error: 'Error on get products and cart' });
    }
});

router.post('/add', async (req, res) => {
    try {
        let retorno;

        const { product } = req.body;

        const { idUser } = product;

        const cartItens = await Cart
            .find()
            .where('idUser').equals(idUser)
            .where('idProduct').equals(product.idProduct);

        if (cartItens.length > 0) {
            let productInCart = cartItens[0];

            productInCart.quantity++;
            productInCart.save(); // .remove() para deletar
        }
        else {
            await Cart.create(product);
        }

        retorno = await Cart
            .find()
            .where('idUser').equals(idUser);

        res.json({
            cart: retorno
        });
    }
    catch (err) {
        console.log(err);

        return res.status(400).send({ error: 'Error on add items into the cart' })
    }
});

module.exports = app => app.use('/product', router);