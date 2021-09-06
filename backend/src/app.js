const express = require('express');
const cors = require('cors');
const serveStatic = require('serve-static');
const path = require('path');
const timeout = require('connect-timeout');
const routes = require('./routes');

const app = express();

function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}

app.use(timeout('5s'));
app.use(cors());
app.use(haltOnTimedout);
app.use(express.json());
app.use(routes);
app.use(haltOnTimedout);
app.use(serveStatic(path.join(__dirname, '/dist')));
app.use(haltOnTimedout);

app.use(express.static(path.join(__dirname, '/dist')));

app.use('/.*/', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

module.exports = app;
