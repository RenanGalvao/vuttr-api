import request from 'supertest';
import app from '../../src/app';
import User from '../../src/interfaces/usersInterface';
import { userCredentials } from '../config/main';


describe('Authentication Controller', () => {

  describe('/login [POST]', () => {

    test('Request to /login with valid body, should res with auth and 201 status', done => {

      request(app).post('/login').send(userCredentials).end((err, res) => {
        expect(res.status).toEqual(201);
        expect(res.type).toEqual('application/json');
        expect(res.body.auth).toBeTruthy()
        expect(res.body.acess_token).toBeTruthy()
        expect(res.body.refresh_token).toBeTruthy();

        done();
      });
    });

    test('Request to /login with invalid body, should res with errors and 400 status', done => {

      request(app).post('/login').send(invalidPostData).end((err, res) => {

        expect(res.status).toEqual(400);
        expect(res.type).toEqual('application/json');
        expect(res.body.errors).toBeTruthy();
        expect(res.body.message).toBeTruthy();

        done();
      });
    });

    test('Request to /login with valid body but non exitent email, should res with auth and 404 status', done => {

      request(app).post('/login').send(invalidEmail).end((err, res) => {

        expect(res.status).toEqual(404);
        expect(res.type).toEqual('application/json');
        expect(res.body.auth).toBeFalsy();

        done();
      });
    });

    test('Request to /login with valid body but wrong password, should res with auth and 401 status', done => {

      request(app).post('/login').send(invalidPassword).end((err, res) => {
        
        expect(res.status).toEqual(401);
        expect(res.type).toEqual('application/json');
        expect(res.body.auth).toBeFalsy();

        done();
      });
    });
  });
});


/*
* Variables used in tests
*/
const invalidPostData = {
  email: '',
  password: '',
} as User;

const invalidEmail = {
  email: 'not.registered.email@gmail.com',
  password: 'doesntmatter',
}

const invalidPassword = {
  email: userCredentials.email,
  password: 'wrongpassword',
} as User;