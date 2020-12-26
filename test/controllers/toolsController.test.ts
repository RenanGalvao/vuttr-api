import request from 'supertest';
import app from '../../src/app';
import Tool from '../../src/interfaces/toolsInterface';
import { userCredentials, nonExistentId, invalidId } from '../config/main';


describe('Tools Controller WITHOUT credentials', () => {

  let toolID:string;
  describe('/tools [GET]', () => {

    test('Request to /tools, should res with [tool] and 200 status', done => {

      request(app).get('/tools').end((err, res) => {

        expect(res.status).toEqual(200);
        expect(res.type).toEqual('application/json');
        expect(res.body).toBeInstanceOf(Array);

        toolID = res.body[0].id;
        done();
      });
    });

    test('Request to /tools/:id, should res with tool and 200 status', done => {

      request(app).get(`/tools/${toolID}`).end((err, res) => {

        expect(res.status).toEqual(200);
        expect(res.type).toEqual('application/json');
        expect(res.body.id).toBeTruthy();
        expect(res.body.title).toBeTruthy();
        expect(res.body.link).toBeTruthy();
        expect(res.body.description).toBeTruthy();
        expect(res.body.tags).toBeTruthy();
        expect(res.body.created_at).toBeUndefined();
        expect(res.body.updated_at).toBeUndefined();
        
        done();
      });
    });

    test('Request to /tools/:non_existent_id, should res with error and 404 status', done => {

      request(app).get(`/tools/${nonExistentId}`).end((err, res) => {

        expect(res.status).toEqual(404);
        expect(res.type).toEqual('application/json');
        expect(res.body.error).toBeTruthy();
        expect(res.body.message).toBeTruthy();
        
        done();
      });
    });

    test('Request to /tools/:invalid_id, should res with error and 400 status', done => {

      request(app).get(`/tools/${invalidId}`).end((err, res) => {

        expect(res.status).toEqual(400);
        expect(res.type).toEqual('application/json');
        expect(res.body.error).toBeTruthy();
        expect(res.body.message).toBeTruthy();

        done();
      });
    });
  });


  describe('/tools [POST]', () => {

    test('Request to /tools/ with valid body, should res with error and 401 status', done => {

      request(app).post('/tools').send(validPostData).end((err, res) => {

        expect(res.status).toEqual(401);
        expect(res.type).toEqual('application/json');
        expect(res.body.error).toBeTruthy();
        expect(res.body.message).toBeTruthy();

        done();
      });
    });
  });

  describe('/tools [PUT]', () => {

    test('Request to /tools/:id with valid body, should res with error and 401 status', done => {

      request(app).put(`/tools/${toolID}`).send(validPutData).end((err, res) => {

        expect(res.status).toEqual(401);
        expect(res.type).toEqual('application/json');
        expect(res.body.error).toBeTruthy();
        expect(res.body.message).toBeTruthy();

        done();
      });
    });
  });

  describe('/tools [DELETE]', () => {
    
    test('Request to /tools/:id, should res with error and 401 status', done => {

      request(app).delete(`/tools/${toolID}`).end((err,res) => {

        expect(res.status).toEqual(401);
        expect(res.type).toEqual('application/json');
        expect(res.body.error).toBeTruthy();
        expect(res.body.message).toBeTruthy();

        done();
      });
    });
  });
});

describe('Tools Controller WITH credentials', () => {

  let toolID:string;
  let authHeader = {
    Authorization: 'Bearer',
  };
  beforeAll(async () => {

    const res = await request(app).post('/login').send(userCredentials);
    authHeader.Authorization = `Bearer ${res.body.acess_token}`;
  });

  describe('/tools [POST]', () => {

    test('Request to /tools with valid body, should res with tool and 201 status', done => {

      request(app).post('/tools').set(authHeader).send(validPostData).end((err, res) => {

        expect(res.status).toEqual(201);
        expect(res.type).toEqual('application/json');
        expect(res.body.id).toBeTruthy();
        expect(res.body.title).toBeTruthy();
        expect(res.body.link).toBeTruthy();
        expect(res.body.description).toBeTruthy();
        expect(res.body.tags).toBeTruthy();
        expect(res.body.created_at).toBeTruthy();
        expect(res.body.updated_at).toBeTruthy();

        toolID = res.body.id;
        done();
      });
    });

    test('Request to /tools with invalid body, should res with errors and 400 status', done => {

      request(app).post('/tools').set(authHeader).send(invalidPostData).end((err, res) => {

        expect(res.status).toEqual(400);
        expect(res.type).toEqual('application/json');
        expect(res.body.errors).toBeTruthy();
        expect(res.body.message).toBeTruthy();
        expect(res.body.errors.title).toBeTruthy();
        expect(res.body.errors.link).toBeTruthy();
        expect(res.body.errors.description).toBeTruthy();
        expect(res.body.errors.tags).toBeTruthy();

        done();
      });
    });
  });

  describe('/tools [PUT]', () => {

    test('Request to /tools/:id with valid body, should res with tool and 200 status', done => {

      request(app).put(`/tools/${toolID}`).set(authHeader).send(validPutData).end((err, res) => {

        expect(res.status).toEqual(200);
        expect(res.type).toEqual('application/json');
        expect(res.body.id).toBeTruthy();
        expect(res.body.title).toBeTruthy();
        expect(res.body.link).toBeTruthy();
        expect(res.body.description).toBeTruthy();
        expect(res.body.tags).toBeTruthy();
        expect(res.body.created_at).toBeTruthy();
        expect(res.body.updated_at).toBeTruthy();

        done();
      });
    });

    test('Request to /tools/:id with invalid body, should res with errors and 400 status', done => {

      request(app).put(`/tools/${toolID}`).set(authHeader).send(invalidPutData).end((err, res) => {

        expect(res.status).toEqual(400);
        expect(res.type).toEqual('application/json');
        expect(res.body.errors).toBeTruthy();
        expect(res.body.message).toBeTruthy();
        expect(res.body.errors.title).toBeTruthy();

        done();
      });
    });

    test('Request to /tools/:no_existent_id with valid body, should res with error and 404 status', done => {

      request(app).put(`/tools/${nonExistentId}`).set(authHeader).send(validPutData).end((err, res) => {

        expect(res.status).toEqual(404);
        expect(res.type).toEqual('application/json');
        expect(res.body.error).toBeTruthy();
        expect(res.body.message).toBeTruthy();

        done();
      });
    });

    test('Request to /tools/:invalid_id with valid body, should res with error and 400 status', done => {

      request(app).put(`/tools/${invalidId}`).set(authHeader).send(validPutData).end((err, res) => {

        expect(res.status).toEqual(400);
        expect(res.type).toEqual('application/json');
        expect(res.body.error).toBeTruthy();
        expect(res.body.message).toBeTruthy();

        done();
      });
    });
  });

  describe('/tools [DELETE]', () => {

    test('Request to /tools/:id, should res with empty body and 204 status', done => {

      request(app).delete(`/tools/${toolID}`).set(authHeader).end((err, res) => {

        expect(res.status).toEqual(204);
        expect(res.body).toMatchObject({});

        done();
      });
    });

    test('Request to /tools/:non_existent_id, should res with error and 204 status', done => {

      request(app).delete(`/tools/${nonExistentId}`).set(authHeader).end((err, res) => {

        expect(res.status).toEqual(204);
        expect(res.body).toMatchObject({});

        done();
      });
    });

    test('Request to /tools/:invalid_id, should res with error and 400 status', done => {

      request(app).delete(`/tools/${invalidId}`).set(authHeader).end((err, res) => {

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
  title: 'screwdriver',
  link: 'Tool box',
  description: 'A screwdriver is a tool, manual or powered, used for screwing (installing) and unscrewing (removing) screws.',
  tags: [
    'screw',
    'repairs',
    'hand tool'
  ],
} as Tool;

const invalidPostData = {
  title: '',
  link: '',
  description: '',
  tags: Array(),
} as Tool;

const validPutData = {
  title: 'Screwdriver'
} as Tool;

const invalidPutData = {
  title: ''
} as Tool;