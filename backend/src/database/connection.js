const knex = require('knex');
const configuration = require('../../knexfile');

let connection = null;

if (process.env.NODE_ENV === 'test') {
  connection = knex(configuration.test);
} else {
  connection = knex(configuration.development);
}

module.exports = connection;
