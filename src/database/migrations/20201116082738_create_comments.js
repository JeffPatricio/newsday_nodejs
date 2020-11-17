exports.up = (knex) => {
  return knex.schema.createTable('comments', (table) => {
    table.increments();
    table.integer('news_id').notNullable();
    table.boolean('text').notNullable();

    table.foreign('news_id').references('id').inTable('news');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('comments');
};