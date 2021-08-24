'use strict';

const express = require('express');
const { users } = require('../models/index.js')
const Collection = require('../models/collection-class.js');
const signupMW = require('../middleware/signup.js');
const signinMW = require('../middleware/signin.js');
const userRoutes = express.Router();
const User = new Collection(users);

userRoutes.post('/user', signupMW, async (req, res) => {
    try {
        let user = await User.create(req.body)
        res.status(201).send(user)
    } catch (err) {
        throw new Error(err)
    }
})

//come back to this after middleware
userRoutes.get('/user', signinMW, async (req, res) => {
    try { res.status(200).send(req.user) }
    catch (err) { throw new Error(err) }
})


module.exports = userRoutes;