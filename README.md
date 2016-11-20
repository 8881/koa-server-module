# koa-server-module

快速构建一个 koa 接口服务器。

## Install

```
npm install --save koa-server-module
```

### Quick start
快速上手，使用简单语法糖快速构建一个服务。

```
// get method
server.get([address],[response]);

// post method
server.post([address],[response]);
```

example.js

```
import {server} from "koa-server-module";

server.get('/get', {
  code: 200,
  msg: 'get success',
  data: null
});

server.post('/post', {
  code: 200,
  msg: 'post success',
  data: null
});

server.listen(9000);
```

```
node example.js
```

浏览器打开 http://localhost:9000/get, 得到对应的json数据

### 另一种写法
即 [koa-router](https://github.com/alexmingoia/koa-router/tree/master/) 的写法。

```
import {server, router} from "koa-server-module";

router.get('/get', async(ctx,next) => {
    ctx.body = JSON.stringify({
        code: 200,
        msg: 'get success',
        data: null
    })
});

router.post('/post', async(ctx,next) => {
    ctx.body = JSON.stringify({
        code: 200,
        msg: 'post success',
        data: null
    })
});

server.listen(9000);
```

### middleware
使用中间件，例如给每个接口设置header。

```
import {server, router} from "koa-server-module";

const setHeader = async(ctx, next) => {
  ctx.set(`Access-Control-Allow-Credentials`, true);
  await next();
};

router.get('/get', setHeader, async(ctx,next) => {
    ctx.body = JSON.stringify({
        code: 200,
        msg: 'get success',
        data: null
    })
});

server.listen(9000);
```

### Delay
延迟响应，模拟慢网速

```
import {server} from "koa-server-module";

server.delay(3000); // 延迟3秒

server.get('/get', {
  code: 200,
  msg: 'get success',
  data: null
});

server.listen(9000);
```

### pagination
分页，获取请求的数据并返回数据。

example

```
import {server, router} from "koa-server-module";

router.get(`/page`, async(ctx, next) => {
  const pageIndex = ctx.query.pageIndex ? parseInt(ctx.query.pageIndex) : 1;
  const pageSize = ctx.query.pageSize ? parseInt(ctx.query.pageSize) : 1;
  ctx.body = JSON.stringify(
    {
      "code": 200,
      "msg": "success",
      "data": {
        pageIndex: pageIndex,
        pageSize: pageSize,
        totalPage: Math.ceil(3 / pageSize),
        list: [
          {
            id: 1,
            name: 1
          },
          {
            id: 2,
            name: 2
          },
          {
            id: 3,
            name: 3
          }
        ].splice((pageIndex - 1) * pageSize, pageSize)
      }
    }
  );
});

server.listen(9000);
```

### es5 way
es5环境下如何使用

```
'use strict';

const server = require('../build/server').server;

server.get('/test',{
  code: 200
});

server.listen(9001);
```

完
