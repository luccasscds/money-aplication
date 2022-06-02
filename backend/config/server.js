const port = process.env.PORT || 3003;

const bodyParser = require('body-parser');
const express = require('express');
const allowCors = require('./cors');
const queryParser = require('express-query-int'); 
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(allowCors);
server.use(queryParser());

server.listen(port, () => console.log(`\nBackend is running on http://localhost:${port}/api`));

module.exports = server;