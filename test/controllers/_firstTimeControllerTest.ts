import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app';
import User from '../../src/interfaces/usersInterface';
// @ts-ignore
import { userCredentials } from '../_database/buildNecessaryDatabaseForTests';

const expect = chai.expect;
chai.use(chaiHttp);


/*
* Variables used in tests
*/
const validPostData = {
  ...userCredentials,
  name: 'Assis Machado'
} as User;

const invalidPostData = {
  name: '',
  email: '',
  password: '',
} as User;


describe('First Time Controller', () => {
  
  describe('/first-time [POST]', () => {

    it('Request to /first-time with invalid body, should res with errors and 400 status', done => {

      chai.request(app).post('/first-time').send(invalidPostData).end((err, res) => {

        expect(res).to.have.status(400);
        expect(res).to.have.property('type', 'application/json');
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('errors');
        expect(res.body).to.have.property('message');
        expect(res.body.errors).to.have.property('name');
        expect(res.body.errors).to.have.property('email');
        expect(res.body.errors).to.have.property('password');

        done();
      });
    });

    it('First request to /first-time with valid body, should res with user and 200 status', done => {


      chai.request(app).post('/first-time').send(validPostData).end((err, res) => {

        expect(res).to.have.status(201);
        expect(res).to.have.property('type', 'application/json');
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('email');
        expect(res.body).to.not.have.property('password');
        expect(res.body).to.not.have.property('created_at');
        expect(res.body).to.not.have.property('updated_at');

        done();
      });
    });

    it('Second request to /first-time with valid body, should res with error and 403 status', done => {


      chai.request(app).post('/first-time').send(validPostData).end((err, res) => {

        expect(res).to.have.status(403);
        expect(res.body).to.be.empty;

        done();
      });
    });
  });
});