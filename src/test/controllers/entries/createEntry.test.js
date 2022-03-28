/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const request = require('supertest');
const { v4: uuidv4 } = require('uuid');
const db = require('../../../db');
const app = require('../../../app');

const emotion = { id: uuidv4(), name: 'Test emotion' };
const entry = { id: uuidv4(), description: 'Test entry', emotionId: emotion.id };
const entryPayload = { description: entry.description, emotion: { id: emotion.id } };

describe('create entry test', () => {
  beforeEach(async () => {
    await db.raw('truncate table entry, emotion');
    await db('emotion').insert(emotion);
  });

  it('It should post succesfully an entry', async () => {
    await request(app)
      .post('/api/v1/entries')
      .send(entryPayload)
      .expect(201);

    const entryResultDb = await db.select('*').from('entry').where('description', entry.description);
    expect(entryResultDb).to.be.an('array').of.lengthOf(1);
    expect(entryResultDb[0].description).to.eq('Test entry');
    expect(entryResultDb[0].emotionId).to.eq(emotion.id);
  });
  it('It should return a 400 if emotion doest not exists', async () => {
    const badPayload = { ...entryPayload, emotion: { id: uuidv4() } };
    await request(app)
      .post('/api/v1/entries')
      .set('content-type', 'application/json')
      .send(badPayload)
      .expect(400, {
        error: {
          isOperational: true,
          status: 'fail',
          statusCode: 400,
        },
        message: 'Unable to map emotion!',
        status: 'fail',
      });
  });
  it('It should return a 400 if emotion is missing', async () => {
    await request(app)
      .post('/api/v1/entries')
      .set('content-type', 'application/json')
      .send({})
      .expect(400, {
        error: {
          isOperational: true,
          status: 'fail',
          statusCode: 400,
        },
        message: 'Emotion is a required field',
        status: 'fail',
      });
  });
});
