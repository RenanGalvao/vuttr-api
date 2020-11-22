import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app';
import mongoose from 'mongoose';


const expect = chai.expect;
chai.use(chaiHttp);

describe('Drop Database Controller', () => {
  
  describe('/drop-database [DELETE]', () => {

    it('Request to /drop-database/yes, should res with empty body and 204 status', done => {

      chai.request(app).delete('/drop-database/yes').end( async(err, res) => {

        expect(res).to.have.status(204);
        expect(res.body).to.be.empty;
        const collectionsIndatabase = await mongoose.connection.db.listCollections().toArray();
        expect(collectionsIndatabase).to.have.length(0);

        done();
      });
    });

    it('Request to /drop-database/anything-else-than-yes, should res with empty body and 400 status', done => {

      const randomStringLength = Math.floor(Math.random() * 100);
      const possibleChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let randomString = '';

      for(let i = 0; i < randomStringLength; i++){
        randomString += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
      }

      chai.request(app).delete(`/drop-database/${randomString}`).end((err, res) => {

        expect(res).to.have.status(400);
        expect(res.body).to.be.empty;

        done();
      });
    });
  });
});