const { Model } = require('objection');
const db = require('../index');

Model.knex(db);

class Emotion extends Model {
  static get tableName() {
    return 'emotion';
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        name: { type: 'string', minLength: 1, maxLength: 50 },
      },
    };
  }
}

module.exports = Emotion;
