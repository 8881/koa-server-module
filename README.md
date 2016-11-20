# koa-server

quickly start a api server or a mock server.


### example 

```
import server from "./server";

server.delay(0);

server.get('/get/test', {
  code: 200,
  msg: 'get success',
  data: null
});

server.post('/post', {
  code: 200,
  msg: 'post success',
  data: null
});

server.start(9000);
```