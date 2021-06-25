const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/auth', async (req, res) => {
    try {
        const { user } = req.body;

        const userExists = await User
            .find()
            .where('id').equals(user.id);

        if (userExists.length > 0) {
            return res.json({ user: userExists[0] });
        }
        else {
            const newUser = await User.create(user);

            return res.send({ user: newUser });
        }
    }
    catch (err) {
        console; log(err);

        return res.status(400).send({ error: 'Error on try to login' });
    }
});

module.exports = app => app.use('/user', router);