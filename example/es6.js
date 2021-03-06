'use strict';

import {server, router} from "../build/index";

server.delay(0);

server.get(`/get/simple`, {
  "code": 200,
  "msg": "success",
  "data": "get ok."
});

server.post(`/post/simple`, {
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

router.get(`/get/complex`, setHeader, async(ctx, next) => {
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

router.post(`/post/complex`, setHeader, async(ctx, next) => {
  ctx.body = JSON.stringify(
    {
      "code": 200,
      "msg": "success",
      "data": "post ok."
    }
  );
});

server.listen(9000);
