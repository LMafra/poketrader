const express = require('express');
const cors = require('cors');
const serveStatic = require('serve-static');
const path = require('path');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(serveStatic(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.status(200);
});

module.exports = app;
