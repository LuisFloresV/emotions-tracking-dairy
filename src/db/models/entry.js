const { Model } = require('objection');
const db = require('../index');
const Emotion = require('./emotion');

Model.knex(db);

class Entry extends Model {
  static get tableName() {
    return 'entry';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id', 'description'],

      properties: {
        description: { type: 'string', minLength: 1, maxLength: 350 },
      },
    };
  }

  static get relationMappings() {
    return {
      emotion: {
        relation: Model.BelongsToOneRelation,
        // eslint-disable-next-line global-require
        modelClass: Emotion,
        join: {
          from: 'entry.emotionId',
          to: 'emotion.id',
        },
      },
    };
  }
}

module.exports = Entry;
