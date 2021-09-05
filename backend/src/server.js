const serveStatic = require("serve-static");
const path = require('path');
const app = require('./app');


app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 3333;
app.listen(port);