/* eslint-disable */
const request = require('supertest');
const connection = require('../../../src/database/connection');
const app = require('../../../src/app');

describe('trades', () => {

  beforeAll(async () => {
    await connection.migrate.latest();
  });

  afterAll(async () => { 
    await connection.destroy();
  })
  
  describe('GET /trades', () => {
  test('should return 200', async () => {
    const response = await request(app).get('/trades');
    expect(response.statusCode).toBe(200);
  });
  // test('should list all trades', async () => {
  // });
  });
  
  // describe('POST /trades/new', () =>{
  //  test('should return success if trade store in db', async () => {
  //  });
  //  test('should return error if trade not store in db', async () => {
  //  });
  // });
});
        
/* eslint-enable */
