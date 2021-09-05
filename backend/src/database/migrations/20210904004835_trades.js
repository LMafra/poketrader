exports.up = function (knex) {
  return knex.schema.createTable('trades', (table) => {
    table.increments();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('trades');
};
