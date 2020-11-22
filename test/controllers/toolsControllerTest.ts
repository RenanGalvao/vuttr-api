import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app';
import Tool from '../../src/interfaces/toolsInterface';
// @ts-ignore
import { userCredentials } from '../_database/buildNecessaryDatabaseForTests';

const expect = chai.expect;
chai.use(chaiHttp);


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

const nonExistentId = '5f98955177acb977cdd38bfe';
const invalidId = '53535ff';


describe('Tools Controller WITHOUT credentials', () => {

  let toolID:string;
  describe('/tools [GET]', () => {

    it('Request to /tools, should res with [tool] and 200 status', done => {

      chai.request(app).get('/tools').end((err, res) => {

        expect(res).to.have.status(200);
        expect(res).to.have.property('type', 'application/json');
        expect(res.body).to.be.a('array');


        toolID = res.body[0]._id;
        done();
      });
    });

    it('Request to /tools/:id, should res with tool and 200 status', done => {

      chai.request(app).get(`/tools/${toolID}`).end((err, res) => {

        expect(res).to.have.status(200);
        expect(res).to.have.property('type', 'application/json');
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('title');
        expect(res.body).to.have.property('link');
        expect(res.body).to.have.property('description');
        expect(res.body).to.have.property('tags');
        expect(res.body).to.not.have.property('created_at');
        expect(res.body).to.not.have.property('updated_at');
        
        done();
      });
    });

    it('Request to /tools/:non_existent_id, should res with error and 404 status', done => {

      chai.request(app).get(`/tools/${nonExistentId}`).end((err, res) => {

        expect(res).to.have.status(404);
        expect(res).to.have.property('type', 'application/json');
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('message');
        
        done();
      });
    });

    it('Request to /tools/:invalid_id, should res with error and 400 status', done => {

      chai.request(app).get(`/tools/${invalidId}`).end((err, res) => {

        expect(res).to.have.status(400);
        expect(res).to.have.property('type', 'application/json');
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('message');

        done();
      });
    });
  });


  describe('/tools [POST]', () => {

    it('Request to /tools/ with valid body, should res with error and 401 status', done => {

      chai.request(app).post('/tools').send(validPostData).end((err, res) => {

        expect(res).to.have.status(401);
        expect(res).to.have.property('type', 'application/json');
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('message');

        done();
      });
    });
  });

  describe('/tools [PUT]', () => {

    it('Request to /tools/:id with valid body, should res with error and 401 status', done => {

      chai.request(app).put(`/tools/${toolID}`).send(validPutData).end((err, res) => {

        expect(res).to.have.status(401);
        expect(res).to.have.property('type', 'application/json');
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('message');

        done();
      });
    });
  });

  describe('/tools [DELETE]', () => {
    
    it('Request to /tools/:id, should res with error and 401 status', done => {

      chai.request(app).delete(`/tools/${toolID}`).end((err,res) => {

        expect(res).to.have.status(401);
        expect(res).to.have.property('type', 'application/json');
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('message');

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
  before(async () => {

    const res = await chai.request(app).post('/login').send(userCredentials);
    authHeader.Authorization = `Bearer ${res.body.token}`;
  });

  describe('/tools [POST]', () => {

    it('Request to /tools with valid body, should res with tool and 201 status', done => {

      chai.request(app).post('/tools').set(authHeader).send(validPostData).end((err, res) => {

        expect(res).to.have.status(201);
        expect(res).to.have.property('type', 'application/json');
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('title');
        expect(res.body).to.have.property('link');
        expect(res.body).to.have.property('description');
        expect(res.body).to.have.property('tags');
        expect(res.body).to.not.have.property('created_at');
        expect(res.body).to.not.have.property('updated_at');

        toolID = res.body._id;
        done();
      });
    });

    it('Request to /tools with invalid body, should res with errors and 400 status', done => {

      chai.request(app).post('/tools').set(authHeader).send(invalidPostData).end((err, res) => {

        expect(res).to.have.status(400);
        expect(res).to.have.property('type', 'application/json');
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('errors');
        expect(res.body).to.have.property('message');
        expect(res.body.errors).to.have.property('title');
        expect(res.body.errors).to.have.property('link');
        expect(res.body.errors).to.have.property('description');
        expect(res.body.errors).to.have.property('tags');

        done();
      });
    });
  });

  describe('/tools [PUT]', () => {

    it('Request to /tools/:id with valid body, should res with tool and 200 status', done => {

      chai.request(app).put(`/tools/${toolID}`).set(authHeader).send(validPutData).end((err, res) => {

        expect(res).to.have.status(200);
        expect(res).to.have.property('type', 'application/json');
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('title');
        expect(res.body).to.have.property('link');
        expect(res.body).to.have.property('description');
        expect(res.body).to.have.property('tags');
        expect(res.body).to.not.have.property('created_at');
        expect(res.body).to.not.have.property('updated_at');

        done();
      });
    });

    it('Request to /tools/:id with invalid body, should res with errors and 400 status', done => {

      chai.request(app).put(`/tools/${toolID}`).set(authHeader).send(invalidPutData).end((err, res) => {

        expect(res).to.have.status(400);
        expect(res).to.have.property('type', 'application/json');
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('errors');
        expect(res.body).to.have.property('message');
        expect(res.body.errors).to.have.property('title');

        done();
      });
    });

    it('Request to /tools/:no_existent_id with valid body, should res with error and 404 status', done => {

      chai.request(app).put(`/tools/${nonExistentId}`).set(authHeader).send(validPutData).end((err, res) => {

        expect(res).to.have.status(404);
        expect(res).to.have.property('type', 'application/json');
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('message');

        done();
      });
    });

    it('Request to /tools/:invalid_id with valid body, should res with error and 400 status', done => {

      chai.request(app).put(`/tools/${invalidId}`).set(authHeader).send(validPutData).end((err, res) => {

        expect(res).to.have.status(400);
        expect(res).to.have.property('type', 'application/json');
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('message');

        done();
      });
    });
  });

  describe('/tools [DELETE]', () => {

    it('Request to /tools/:id, should res with empty body and 204 status', done => {

      chai.request(app).delete(`/tools/${toolID}`).set(authHeader).end((err, res) => {

        expect(res).to.have.status(204);
        expect(res.body).to.be.empty;

        done();
      });
    });

    it('Request to /tools/:non_existent_id, should res with error and 404 status', done => {

      chai.request(app).delete(`/tools/${nonExistentId}`).set(authHeader).end((err, res) => {

        expect(res).to.have.status(404);
        expect(res).to.have.property('type', 'application/json');
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('message');

        done();
      });
    });

    it('Request to /tools/:invalid_id, should res with error and 400 status', done => {

      chai.request(app).delete(`/tools/${invalidId}`).set(authHeader).end((err, res) => {

        expect(res).to.have.status(400);
        expect(res).to.have.property('type', 'application/json');
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('message');

        done();
      });
    });
  });
});