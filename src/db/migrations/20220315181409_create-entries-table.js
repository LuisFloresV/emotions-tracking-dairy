exports.up = async (knex) => {
  await knex.schema.createTable('emotions', (table) => {
    table.uuid('id').primary();
    table.string('name', '50').unique().notNullable();
    table.timestamps(false, true);
  });
  await knex.schema.createTable('entries', (table) => {
    table.uuid('id').primary();
    table.string('description', '350').notNullable();
    table.uuid('emotion_id').notNullable().references('id').inTable('emotions');
    table.timestamps(false, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('entry');
  await knex.schema.dropTable('emotion');
};
