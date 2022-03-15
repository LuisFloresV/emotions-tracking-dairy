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
      required: ['description', 'id', 'emotion_id'],

      properties: {
        id: { type: 'uuid' },
        description: { type: 'string', minLength: 1, maxLength: 350 },
        emotion_id: { type: 'uuid' },
      },
    };
  }

  static get relationMappings() {
    // eslint-disable-next-line global-require
    const Emotion = require('./emotion');
    return {
      emotions: {
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
