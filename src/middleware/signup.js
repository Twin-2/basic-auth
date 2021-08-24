'use strict';

const bcrypt = require('bcrypt');

const signup = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 7);
        next();
    } catch (err) {
        console.log("----------------------")
        next('invlaid')
    }
}

module.exports = signup;