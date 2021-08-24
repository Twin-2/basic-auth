'use strict';

const { sequelize, DataTypes } = require('./index.js');

const Users = sequelize.define('Users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

Users.searchUsers = async function (name) {
    let found = await this.findOne({ where: { username: name } })
    return found
};


module.exports = Users;