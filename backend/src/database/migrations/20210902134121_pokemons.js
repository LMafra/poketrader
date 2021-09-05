exports.up = function (knex) {
  return knex.schema.createTable('pokemons', (table) => {
    table.decimal('id').primary();
    table.string('name').notNullable().unique();
    table.decimal('height').notNullable();
    table.decimal('weight').notNullable();
    table.decimal('base_experience').notNullable();
    table.string('sprite').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('pokemons');
};
