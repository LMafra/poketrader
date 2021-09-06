/* eslint-disable */
const request = require('supertest');
const connection = require('../../../src/database/connection');
const app = require('../../../src/app');

describe('trades', () => {

  const trades = {
    goodTrade: {
      trainer: 1,
      tradeId: 1,
      pokemonId: 32,
    },
    badTrade: {
      trainer: 1,
      tradeId: 1,
      pokemonId: null,
    },
  }

  const models = {
    goodTrade: null,
    badTrade:null,
  }

  let pkmDB = null;
  let tradeDB = null;

  beforeAll(async () => {

    await connection.migrate.latest();
    pkmDB = await connection('pokemons').insert({
      id: 493,
      name: 'froslass',
      height: 13,
      weight: 266,
      base_experience: 168,
      sprite: '',
    });
    tradeDB = await connection('trades_pokemons').insert({
      trainer: 1,
      trade_id: 1,
      pokemon_id: 493,
    });
  });

  afterAll(async () => { 
    await connection.destroy();
  })
  
  describe('GET /trades', () => {
    test('should return 200', async () => {
      const response = await request(app).get('/trades');
      expect(response.statusCode).toBe(200);
    });
    test('should list a trade', async () => {
      const id = pkmDB[0].id;
      const name = pkmDB[0].name;
      const height = pkmDB[0].height;
      const weight = pkmDB[0].weight;
      const base_experience = pkmDB[0].base_experience;
      const sprite = pkmDB[0].sprite;
      const trainer = tradeDB[0].trainer;
      const trade_id = tradeDB[0].trade_id;
      const { body:trade } = await request(app).get('/trades').expect(200);
      expect(trade.id).toBe(id);
      expect(trade.trainer).toBe(trainer);
      expect(trade.trade_id).toBe(trade_id);
      expect(trade.name).toBe(name);
      expect(trade.height).toBe(height);
      expect(trade.weight).toBe(weight);
      expect(trade.base_experience).toBe(base_experience);
      expect(trade.sprite).toBe(sprite);
    });
  });
  
  describe('POST /trades', () =>{
    test('should return success if trade store in db', async () => {
      const { trade } = await request(app).post('/trades').send(trades.goodTrade).expect(200);
    });
    test('should return error if trade not store in db', async () => {
      const { trade } = await request(app).post('/trades').send(trades.badTrade);
      expect(trade).toThrowError(error);
    });
  });
});
        
/* eslint-enable */
