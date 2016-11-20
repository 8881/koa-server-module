"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = exports.server = exports.app = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _kcors = require("kcors");

var _kcors2 = _interopRequireDefault(_kcors);

var _koaRouter = require("koa-router");

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaConvert = require("koa-convert");

var _koaConvert2 = _interopRequireDefault(_koaConvert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

"use strict";

require('babel-polyfill');

var app = new _koa2.default();
var cors = new _kcors2.default();
var router = new _koaRouter2.default({
  prefix: ""
});

// API延迟时间配置
var delay_time = 0; // 0ms

var delay = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new Promise(function (resolve, reject) {
              setTimeout(resolve, delay_time);
            });

          case 2:
            _context.next = 4;
            return next();

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function delay(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// 延迟响应中间件
app.use(delay);
app.use((0, _koaConvert2.default)(cors));
app.use(router.routes());

var server = function () {
  function server() {
    _classCallCheck(this, server);
  }

  _createClass(server, null, [{
    key: "delay",
    value: function delay(ms) {
      var m = parseInt(ms, 10);
      delay_time = isNaN(m) ? 0 : m;
    }
  }, {
    key: "get",
    value: function get(addr, res) {
      var _this = this;

      router.get(addr, function () {
        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx, next) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  ctx.body = JSON.stringify(res);

                case 1:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, _this);
        }));

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "post",
    value: function post(addr, res) {
      var _this2 = this;

      router.post(addr, function () {
        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(ctx, next) {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  ctx.body = JSON.stringify(res);

                case 1:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, _this2);
        }));

        return function (_x5, _x6) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "listen",
    value: function listen(port) {
      var p = parseInt(port, 10);
      p = isNaN(p) || !isNaN(p) && (p < 0 || p > 65536) ? 9000 : p;
      var s = _http2.default.createServer(app.callback());
      s.listen(p, function () {
        var port = s.address().port;
        console.log("[server] http://localhost:" + port);
      });
    }
  }]);

  return server;
}();

exports.app = app;
exports.server = server;
exports.router = router;