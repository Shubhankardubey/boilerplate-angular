const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/ng-build`));

app.get('/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/ng-build/index.html`));
});

module.exports = app;
