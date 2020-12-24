import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app';
import User from '../../src/interfaces/usersInterface';

const expect = chai.expect;
chai.use(chaiHttp);

/*
* Variables used in tests
*/
const userCredentials = {
  email: 'admin@dev.com',
  password: 'admin',
};

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



describe('Authentication Controller', () => {

  describe('/login [POST]', () => {

    it('Request to /login with valid body, should res with auth and 201 status', done => {

      chai.request(app).post('/login').send(userCredentials).end((err, res) => {

        expect(res).to.have.status(201);
        expect(res).to.have.property('type', 'application/json');
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('auth', true);
        expect(res.body).to.have.property('acess_token');
        expect(res.body).to.have.property('refresh_token');

        done();
      });
    });

    it('Request to /login with invalid body, should res with errors and 400 status', done => {

      chai.request(app).post('/login').send(invalidPostData).end((err, res) => {

        expect(res).to.have.status(400);
        expect(res).to.have.property('type', 'application/json');
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('errors');
        expect(res.body).to.have.property('message');

        done();
      });
    });

    it('Request to /login with valid body but non exitent email, should res with auth and 404 status', done => {

      chai.request(app).post('/login').send(invalidEmail).end((err, res) => {

        expect(res).to.have.status(404);
        expect(res).to.have.property('type', 'application/json');
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('auth', false);

        done();
      });
    });

    it('Request to /login with valid body but wrong password, should res with auth and 401 status', done => {

      chai.request(app).post('/login').send(invalidPassword).end((err, res) => {
        expect(res).to.have.status(401);
        expect(res).to.have.property('type', 'application/json');
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('auth', false);

        done();
      });
    });
  });
});