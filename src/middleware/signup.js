'use strict';

const bcrypt = require('bcrypt');

const signup = async (req, res, next) => {
    req.body.password = await bcrypt.hash(req.body.password, 7);
    next();
}

module.exports = signup;