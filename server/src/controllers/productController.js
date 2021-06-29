const express = require('express');
const router = express.Router();

const Cart = require('../models/cart');
const Order = require('../models/order');
const Product = require('../models/product');

// Obtém os produtos que estão no carrinho do usuário.
const getProductsInCart = async (idUser) => {
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
            id: dataCartItem.id,
            idProduct: o.id,
            idUser: dataCartItem.idUser,
            quantity: dataCartItem.quantity
        };
    });

    return productsCart;
};

// Lista os produtos para compra e obtém também os produtos que estão no carrinho do usuário.
router.get('/home', async (req, res) => {
    try {
        const { idUser } = req.query;

        const products = await Product
            .find()
            .sort({ value: -1 });

        return res.json({ products });
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ error: err });
    }
});

// Adiciona no carrinho o produto.
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
            await productInCart.save();
        }
        else {
            await Cart.create(product);
        }

        retorno = await Cart
            .find()
            .where('idUser').equals(idUser);

        res.json({ cart: retorno });
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ error: err });
    }
});

// Lista os itens que estão no carrinho do usuário.
router.get('/cart', async (req, res) => {
    try {
        const { idUser } = req.query;

        const productsCart = await getProductsInCart(idUser);

        res.json({ products: productsCart });
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ error: err });
    }
});

// Remove o item do carrinho do usuário.
router.post('/remove', async (req, res) => {
    try {
        const { idUser, idProduct } = req.body.params;

        const productInCart = await Cart
            .find()
            .where('idProduct').equals(idProduct)
            .where('idUser').equals(idUser);

        if (productInCart.length === 1) {
            await productInCart[0].remove();
        }

        const productsCart = await getProductsInCart(idUser);

        res.json({ products: productsCart });
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ error: err });
    }
});

// Finaliza o pedido com os itens que estão no carrinho do usuário.
router.post('/finish', async (req, res) => {
    try {
        const { idUser, total } = req.body.params;

        const itensInCart = await Cart
            .find()
            .where('idUser').equals(idUser);

        itensInCart.forEach(i => i.remove());

        // Cria o boleto "fake"
        let bankSlip = '';

        for (let index = 0; index < 48; index++) {
            bankSlip += Math.floor(Math.random() * 10);
        }

        const newOrder = {
            bankSlip,
            idUser,
            total,
            numOrder: parseInt(Math.random() * 100000).toString(),
            dateFinish: new Date()
        };

        await Order.create(newOrder);

        res.status(200).send({});
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ error: err });
    }
});

// Obtém o último pedido que o usuário finalizou, pois no sistema só possível acessar essas entidades, quando o usuário finaliza o pedido, não é possível obter um histórico.
router.get('/order', async (req, res) => {
    try {
        const { idUser } = req.query;

        const orders = await Order
            .find()
            .sort({ dateFinish: -1 })
            .where('idUser').equals(idUser);

        res.send({ order: orders[0] });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ error: err });
    }
});

module.exports = app => app.use('/product', router);