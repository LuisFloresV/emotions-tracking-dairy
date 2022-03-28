exports.up = async (knex) => {
  await knex.schema.createTable('emotion', (table) => {
    table.uuid('id').primary();
    table.string('name', '50').unique().notNullable();
    table.timestamps(false, true);
  });
  await knex.schema.createTable('entry', (table) => {
    table.uuid('id').primary();
    table.string('description', '350').notNullable();
    table.uuid('emotion_id').notNullable().references('id').inTable('emotion');
    table.timestamps(false, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('entry');
  await knex.schema.dropTableIfExists('emotion');
};
