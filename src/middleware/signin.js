'use struct';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const Users = require('../models/userModel');

const signin = async (req, res, next) => {
    let userData = req.headers.authorization.split(' ').pop();
    let decoded = base64.decode(userData);
    let [username, password] = decoded.split(':');
    let foundUser = await Users.searchUsers(username);
    let isValid = await bcrypt.compare(password, foundUser.password);
    if (isValid) {
        req.user = foundUser
    } else {
        next('invalid password')
    }
    next();
}

module.exports = signin;