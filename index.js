'use strict';

const server = require('./src/server.js');
const PORT = process.env.PORT
const { sequelize } = require('./src/models/index.js')


sequelize.sync()
    .then(() => {
        server.start(PORT)
    })