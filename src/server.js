'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');
const errorHandler = require('./errorHandlers/500.js');
const handleNotFound = require('./errorHandlers/404.js')

app.use(cors());
app.use(express.json());


app.use(userRoutes);
app.use('*', handleNotFound)
app.use(errorHandler)

module.exports = {
    server: app,
    start: PORT => {
        app.listen(PORT, () => {
            console.log(`server up on ${PORT}`)
        })
    }
}