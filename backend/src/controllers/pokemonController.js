const Pokedex = require('pokedex-promise-v2');

const connection = require('../database/connection');

const PokeApi = new Pokedex();

module.exports = {

  async index(req, res) {
    const pokemons = await connection('pokemons').select('*');
    return res.json(pokemons);
  },

  async create(req, res) {
    PokeApi.getPokemonByName(`${req.params.name}`)
      .then(async (response) => {
        const pokemon = await connection('pokemons').insert({
          id: response.id,
          name: response.name,
          height: response.height,
          weight: response.weight,
          base_experience: response.base_experience,
          sprite: response.sprites.front_shiny,
        });
        res.json(pokemon);
      })
      .catch((error) => {
        res.json(error);
      });
  },
};
