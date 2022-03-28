/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const request = require('supertest');
const { v4: uuidv4 } = require('uuid');
const db = require('../../../db');
const app = require('../../../app');

const emotion = { id: uuidv4(), name: 'Test emotion' };
const entry = { id: uuidv4(), description: 'Test entry', emotionId: emotion.id };

describe('get entry test', () => {
  beforeEach(async () => {
    await db.raw('truncate table entry,emotion');
    await db('emotion').insert(emotion);
    await db('entry').insert(entry);
  });

  it('It should get succesfully an entry', async () => {
    const res = await request(app)
      .get('/api/v1/entries')
      .expect(200);
    expect(res.body).to.be.an('array').of.lengthOf(1);
    expect(res.body[0].id).to.be.eq(entry.id);
    expect(res.body[0].emotionId).to.be.eq(emotion.id);
  });
  it('It should get succesfully an entry with expanded fields', async () => {
    const res = await request(app)
      .get('/api/v1/entries')
      .query({ expand: '*' })
      .expect(200);
    expect(res.body).to.be.an('array').of.lengthOf(1);
    expect(res.body[0].id).to.be.eq(entry.id);
    expect(res.body[0].emotionId).to.be.eq(emotion.id);
    expect(res.body[0].emotion).to.be.an('object');
    expect(res.body[0].emotion.name).to.be.eq('Test emotion');
  });
  it('It should get succesfully an entry by id', async () => {
    const res = await request(app)
      .get('/api/v1/entries')
      .query({ id: entry.id })
      .expect(200);
    expect(res.body).to.be.an('array').of.lengthOf(1);
    expect(res.body[0].id).to.be.eq(entry.id);
    expect(res.body[0].emotionId).to.be.eq(emotion.id);
  });
});
