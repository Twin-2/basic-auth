'use strict';

const express = require('express');
const users = require('../models/userModel.js')
const Collection = require('../models/collection-class.js');
const signupMW = require('../middleware/signup.js');
const signinMW = require('../middleware/signin.js');
const userRoutes = express.Router();
const User = new Collection(users);

userRoutes.post('/user', signupMW, async (req, res, next) => {

    let user = await User.create(req.body)
    if (!user) {
        next('error creating user')
    }
    res.status(201).send(user)
})

//come back to this after middleware
userRoutes.get('/user', signinMW, async (req, res) => {
    try { res.status(200).send(req.user) }
    catch (err) { throw new Error(err) }
})


module.exports = userRoutes;