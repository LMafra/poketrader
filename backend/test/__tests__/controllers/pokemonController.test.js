/* eslint-disable */
const request = require('supertest');
const connection = require('../../../src/database/connection');
const app = require('../../../src/app');

describe('pokemons', () =>{

  const pkm = {
    arceus: {
      id: 493,
      name: 'arceus',
      height: 32,
      weight: 3200,
      base_experience: 324,
    },
  }
  const models = {
    arceus: null,
  }
  let pkmDB = null;

  beforeAll(async () => {
    await connection.migrate.latest();

    pkmDB = await connection('pokemons').insert({
      id: 478,
      name: 'froslass',
      height: 13,
      weight: 266,
      base_experience: 168,
      sprite: '',
    });
  });

  afterAll(async () => { 
    await connection.destroy();
  })

  describe('GET /pokemons', () => {

    test('should return 200', async () => {
      const response = await request(app).get('/pokemons');
      expect(response.statusCode).toBe(200);
    });
    test('should list a pokemon in database', async () => {
      const id = pkmDB[0].id;
      const name = pkmDB[0].name;
      const height = pkmDB[0].height;
      const weight = pkmDB[0].weight;
      const base_experience = pkmDB[0].base_experience;
      const sprite = pkmDB[0].sprite;
      const { body:pokemon } = await request(app).get('/pokemons').expect(200);
      expect(pokemon.id).toBe(id);
      expect(pokemon.name).toBe(name);
      expect(pokemon.height).toBe(height);
      expect(pokemon.weight).toBe(weight);
      expect(pokemon.base_experience).toBe(base_experience);
      expect(pokemon.sprite).toBe(sprite);
    });
  });

  describe('POST /pokemons/:name', () =>{
    test('should get a Pokemon with PokeApi', async () => {
      const { pokemons } = await request(app).post(`/pokemons/${pkm.arceus.name}`);
      expect(pokemons).toBeTruthy();
    });
    test('should get error with empty params', async () => {
      const { pokemons } = await request(app).post(`/pokemons/`).expect(404);
    });
    test('should get error with wrong name', async () => {
      const name = 'baba'
      const { pokemons } = await request(app).post(`/pokemons/${name}`);
      expect(pokemons).toThrowError(error);
    });
  });

});

/* eslint-enable */
