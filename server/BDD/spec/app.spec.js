const request = require('supertest');
const should = require('should');
const app = require('./../app');

describe('POST /add', () => {
  describe('On success', () => {
    it('유저 객체를 담은 배열로 응답한다', (done) => {
      request(app)
        .post('/add')
        .expect(201)
        .send({
          x: 1,
          y: 1
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.equal(2);
          done();
        });
    });
  });
  describe('On failure', () => {
    it('JSON 데이터가 숫자가 아니면 400을 응답한다.', (done) => {
      request(app)
        .post('/add')
        .send({
          x: 'one',
          y: 'one'
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.equal('Not a number');
          done();
        });
    });
  });
});
//TODO 'POST /sub' test code
