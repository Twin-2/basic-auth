'use strict';

const User = (sequelize, DataTypes) => sequelize.define('Users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

// methods.searchUsers = function (name) {
//     User.findOne({ where: { username: name } })
// };



module.exports = User;