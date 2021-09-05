const express = require('express');

const PokemonController = require('./controllers/pokemonController');
const TradeController = require('./controllers/tradeController');

const routes = express.Router();

routes.get('/pokemons', PokemonController.index);
routes.post('/pokemons/:name', PokemonController.create);

routes.get('/trades', TradeController.index);
routes.post('/trades', TradeController.trade);
routes.get('/trades/last', TradeController.getLastTrade);

module.exports = routes;
