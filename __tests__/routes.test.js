'use strict';


const supertest = require('supertest');
const { server } = require('../src/server.js');
const { sequelize } = require('../src/models/index.js');
const mockRequest = supertest(server);
const base64 = require('base-64');

describe('API ROUTES', () => {

    beforeEach(async () => {
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.drop();
    })

    it('should respond with a status or 404 if no route is found', async () => {
        await mockRequest.get('/no-route')
            .then(results => {
                expect(results.status).toEqual(404)
            })
    })

    it('should respond to a POST request at route /user with a status of 201 and a user object', async () => {
        let results = await mockRequest.post('/user').send({ username: "test", password: 'test' });
        expect(results.status).toBe(201);
        expect(typeof results.body).toBe('object')
    })

    it('should respond to a GET request at a route of /user with a status of 200 and a user object', async () => {
        let results = await mockRequest.post('/user').send({ username: "test", password: 'test' });
        let getRequest = await mockRequest.get('/user').auth('test', 'test')
        expect(getRequest.status).toBe(200)
        expect(typeof getRequest.body).toBe('object')
    })

    it('should respond with an error code of 500 and a messege of invalid password to a GET route if the password does not match the one provided', async () => {
        let results = await mockRequest.post('/user').send({ username: "test", password: 'test' });
        let getRequest = await mockRequest.get('/user').auth('test', 'nopassword')
        expect(getRequest.status).toBe(500)
        expect(getRequest.body.messege).toBe('invalid password')
    })

})