exports.up = (knex) => {
  return knex.schema.createTable('news', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.boolean('content').notNullable();
    table.string('image').notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('news');
};