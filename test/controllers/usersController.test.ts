import request from 'supertest';
import app from '../../src/app';
import User from '../../src/interfaces/usersInterface';
import { userCredentials, nonExistentId, invalidId } from '../config/main';


describe('User Controller WITHOUT credentials', () => {

  let userId:string;
  describe('/users[GET]', () => {

    test('Request to /users, should res with [user] and 200 status', done => {

      request(app).get('/users').end((err, res) => {

        expect(res.status).toEqual(200);
        expect(res.type).toEqual('application/json');
        expect(res.body).toBeInstanceOf(Array);

        userId = res.body[0].id;
        done();
      });
    });

    test('Request to /users/:id, should res with user and 200 status', done => {

      request(app).get(`/users/${userId}`).end((err, res) => {

        expect(res.status).toEqual(200);
        expect(res.type).toEqual('application/json');
        expect(res.body.id).toBeTruthy();
        expect(res.body.name).toBeTruthy();
        expect(res.body.email).toBeTruthy();
        expect(res.body.created_at).toBeUndefined();
        expect(res.body.updated_at).toBeUndefined();
        
        done();
      });
    });

    test('Request to /users/:non_existent_id, should res with error and 404 status', done => {

      request(app).get(`/users/${nonExistentId}`).end((err, res) => {

        expect(res.status).toEqual(404);
        expect(res.type).toEqual('application/json');
        expect(res.body.error).toBeTruthy();
        expect(res.body.message).toBeTruthy();
        
        done();
      });
    });

    test('Request to /users/:invalid_id, should res with error and 400 status', done => {

      request(app).get(`/users/${invalidId}`).end((err, res) => {

        expect(res.status).toEqual(400);
        expect(res.type).toEqual('application/json');
        expect(res.body.error).toBeTruthy();
        expect(res.body.message).toBeTruthy();

        done();
      });
    });
  });


  describe('/users [POST]', () => {

    test('Request to /users with valid body, should res with user and 201 status', done => {

      request(app).post('/users').send(validPostData).end((err, res) => {

        expect(res.status).toEqual(201);
        expect(res.type).toEqual('application/json');
        expect(res.body.id).toBeTruthy();
        expect(res.body.name).toBeTruthy();
        expect(res.body.email).toBeTruthy();
        expect(res.body.created_at).toBeUndefined();
        expect(res.body.updated_at).toBeUndefined();

        done();
      });
    });
  });

  describe('/users [PUT]', () => {

    test('Request to /users/:id with valid body, should res with error and 401 status', done => {

      request(app).put(`/users/${userId}`).send(validPutData).end((err, res) => {

        expect(res.status).toEqual(401);
        expect(res.type).toEqual('application/json');
        expect(res.body.error).toBeTruthy();
        expect(res.body.message).toBeTruthy();

        done();
      });
    });
  });

  describe('/users [DELETE]', () => {
    
    test('Request to /users/:id, should res with error and 401 status', done => {

      request(app).delete(`/users/${userId}`).end((err,res) => {

        expect(res.status).toEqual(401);
        expect(res.type).toEqual('application/json');
        expect(res.body.error).toBeTruthy();
        expect(res.body.message).toBeTruthy();

        done();
      });
    });
  });
});


describe('User Controller WITH credentials', () => {

  let userId:string;
  let agent: request.SuperAgentTest;
  beforeAll(async () => {
    agent = request.agent(app);
    await agent.post('/login').send(userCredentials);
  });

  describe('/users [POST]', () => {

    test('Request to /users with valid body, should res with user and 201 status', done => {

      agent.post('/users').send(validPostData).end((err, res) => {

        expect(res.status).toEqual(201);
        expect(res.type).toEqual('application/json');
        expect(res.body.id).toBeTruthy();
        expect(res.body.name).toBeTruthy();
        expect(res.body.email).toBeTruthy();
        expect(res.body.created_at).toBeTruthy();
        expect(res.body.updated_at).toBeTruthy();

        userId = res.body.id;
        done();
      });
    });

    test('Request to /users with invalid body, should res with errors and 400 status', done => {

      agent.post('/users').send(invalidPostData).end((err, res) => {

        expect(res.status).toEqual(400);
        expect(res.type).toEqual('application/json');
        expect(res.body.errors).toBeTruthy();
        expect(res.body.message).toBeTruthy();
        expect(res.body.errors.name).toBeTruthy();
        expect(res.body.errors.email).toBeTruthy();
        expect(res.body.errors.password).toBeTruthy();

        done();
      });
    });
  });

  describe('/users [PUT]', () => {

    test('Request to /users/:id with valid body, should res with user and 200 status', done => {

      agent.put(`/users/${userId}`).send(validPutData).end((err, res) => {

        expect(res.status).toEqual(200);
        expect(res.type).toEqual('application/json');
        expect(res.body.id).toBeTruthy();
        expect(res.body.name).toBeTruthy();
        expect(res.body.email).toBeTruthy();
        expect(res.body.created_at).toBeTruthy();
        expect(res.body.updated_at).toBeTruthy();

        done();
      });
    });

    test('Request to /users/:id with invalid body, should res with errors and 400 status', done => {

      agent.put(`/users/${userId}`).send(invalidPutData).end((err, res) => {

        expect(res.status).toEqual(400);
        expect(res.type).toEqual('application/json');
        expect(res.body.errors).toBeTruthy();
        expect(res.body.message).toBeTruthy();
        expect(res.body.errors.name).toBeTruthy();

        done();
      });
    });

    test('Request to /users/:invalid_id with valid body, should res with error and 400 status', done => {

      agent.put(`/users/${invalidId}`).send(validPutData).end((err, res) => {

        expect(res.status).toEqual(400);
        expect(res.type).toEqual('application/json');
        expect(res.body.error).toBeTruthy();
        expect(res.body.message).toBeTruthy();

        done();
      });
    });
  });

  describe('/users [DELETE]', () => {

    test('Request to /users/:id, should res with empty body and 204 status', done => {

      agent.delete(`/users/${userId}`).end((err, res) => {

        expect(res.status).toEqual(204);
        expect(res.body).toMatchObject({});

        done();
      });
    });

    test('Request to /users/:non_existent_id, should res with error and 204 status', done => {

      agent.delete(`/users/${nonExistentId}`).end((err, res) => {

        expect(res.status).toEqual(204);
        expect(res.body).toMatchObject({});

        done();
      });
    });

    test('Request to /users/:invalid_id, should res with error and 400 status', done => {

      agent.delete(`/users/${invalidId}`).end((err, res) => {

        expect(res.status).toEqual(400);
        expect(res.type).toEqual('application/json');
        expect(res.body.error).toBeTruthy();
        expect(res.body.message).toBeTruthy();

        done();
      });
    });
  });
});


/*
* Variables used in tests
*/
const validPostData = {
  name: 'Meme',
  email: 'menes@mail.com',
  password: 'betteralongthanacrypto',
} as User;

const invalidPostData = {
  name: '',
  email: '',
  password: '',
} as User;

const validPutData = {
  name: 'João'
} as User;

const invalidPutData = {
  name: ''
} as User;