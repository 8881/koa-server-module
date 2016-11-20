'use strict';

const server = require('../build/server').server;

console.log(server);

server.get('/test',{
  code: 200
});

server.listen(9001);
