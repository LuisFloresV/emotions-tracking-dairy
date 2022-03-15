const { Model } = require('objection');
const db = require('../index');

Model.knex(db);

class Emotion extends Model {
  static get tableName() {
    return 'emotions';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'id'],

      properties: {
        id: { type: 'uuid' },
        name: { type: 'string', minLength: 1, maxLength: 50 },
      },
    };
  }
}

module.exports = Emotion;
