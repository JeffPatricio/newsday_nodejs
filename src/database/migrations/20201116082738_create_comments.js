exports.up = (knex) => {
  return knex.schema.createTable('comments', (table) => {
    table.increments();
    table.integer('news_id').notNullable();
    table.integer('user_id').notNullable();
    table.boolean('text').notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('comments');
};