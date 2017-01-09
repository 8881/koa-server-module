'use strict';

const server = require('../build/index').server;

server.delay(0);

server.get('/test', {
  code: 200
});

server.listen(9001);
