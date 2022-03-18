const { Model } = require('objection');
const db = require('../index');

Model.knex(db);

class Entry extends Model {
  static get tableName() {
    return 'entries';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['description', 'id'],

      properties: {
        description: { type: 'string', minLength: 1, maxLength: 350 },
      },
    };
  }

  static get relationMappings() {
    // eslint-disable-next-line global-require
    const Emotion = require('./emotion');
    return {
      emotion: {
        relation: Model.BelongsToOneRelation,
        modelClass: Emotion,
        join: {
          from: 'entries.emotion_id',
          to: 'emotions.id',
        },
      },
    };
  }
}

module.exports = Entry;
