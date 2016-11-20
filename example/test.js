'use strict';

import {app, server, router} from "../server";

server.delay(0);

server.get(`/get`, {
  "code": 200,
  "msg": "success",
  "data": "get ok."
});

server.post(`/post`, {
  "code": 200,
  "msg": "success",
  "data": "post ok."
});

const setHeader = async(ctx, next) => {
  ctx.set(`Access-Control-Allow-Credentials`, true);
  ctx.cookies.set(`auth`, `123456`, {
    httpOnly: true
  });
  await next();
};

router.get(`/get`, setHeader, async(ctx, next) => {
  ctx.body = JSON.stringify(
    {
      "code": 200,
      "msg": "success",
      "data": "get ok."
    }
  );
});

router.get(`/page`, setHeader, async(ctx, next) => {
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
        ]
          .splice((pageIndex - 1) * pageSize, pageSize)
      }
    }
  );
});

router.post(`/post`, setHeader, async(ctx, next) => {
  ctx.body = JSON.stringify(
    {
      "code": 200,
      "msg": "success",
      "data": "post ok."
    }
  );
});

app.listen(9000, () => {
  console.log(`[server] http://localhost:${9000}`);
});