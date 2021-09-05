const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const tradePokemons = await connection('trades_pokemons')
      .leftJoin('pokemons', 'pokemons.id', '=', 'trades_pokemons.pokemon_id')
      .leftJoin('trades', 'trades.id', '=', 'trades_pokemons.trade_id')
      .select(['trades_pokemons.*', 'trades.id', 'pokemons.*']);

    return res.json(tradePokemons);
  },
  async trade(req, res) {
    const { trainer, pokemonId, tradeId } = req.body;

    const t = await connection('trades')
      .insert({
        id: tradeId,
      }).onConflict('id')
      .ignore();

    const trade = await connection('trades_pokemons').insert({
      trainer,
      trade_id: tradeId,
      pokemon_id: pokemonId,
    });

    return res.json([trade, t]);
  },

  async getLastTrade(req, res) {
    const [count] = await connection('trades').count();
    return res.json(count['count(*)']);
  },
};
