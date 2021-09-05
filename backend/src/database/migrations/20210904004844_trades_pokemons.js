exports.up = function (knex) {
  return knex.schema.createTable('trades_pokemons', (table) => {
    table.increments();

    table.decimal('trainer').notNullable();
    table.decimal('trade_id').notNullable();
    table.decimal('pokemon_id').notNullable();

    table.foreign('trade_id').references('id').inTable('trades');
    table.foreign('pokemon_id').references('id').inTable('pokemons');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('trades_pokemons');
};
