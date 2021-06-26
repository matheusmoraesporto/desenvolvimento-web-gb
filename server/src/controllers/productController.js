const express = require('express');
const router = express.Router();

const Cart = require('../models/cart');
const Product = require('../models/product');

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
        return res.status(400).send({ error: err });
    }
});

router.post('/add', async (req, res) => {
    try {
        let retorno;

        const { product } = req.body;

        const { idProduct, idUser } = product;

        const cartItens = await Cart
            .find()
            .where('idUser').equals(idUser)
            .where('idProduct').equals(idProduct);

        if (cartItens.length > 0) {
            let productInCart = cartItens[0];

            productInCart.quantity++;
            await productInCart.save(); // .remove() para deletar
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
        return res.status(400).send({ error: err });
    }
});


router.get('/cart', async (req, res) => {
    try {
        const { idUser } = req.query;

        const cartItens = await Cart
            .find()
            .where('idUser').equals(idUser);

        const idsProductsInCart = cartItens.map(o => o.idProduct);

        let products = await Product.find();

        products = products.filter(o => idsProductsInCart.includes(o.id));

        const productsCart = products.map(o => {
            let dataCartItem = cartItens.filter(x => x.idProduct === o.id)[0];

            return {
                description: o.description,
                img: o.img,
                value: o.value,
                productCode: o.productCode,
                idProduct: o.id,
                idUser: dataCartItem.idUser,
                quantity: dataCartItem.quantity
            };
        });

        res.json({ products: productsCart });
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ error: err });
    }
});

module.exports = app => app.use('/product', router);