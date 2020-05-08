'use strict';

exports.__esModule = true;

var _app = require('./app');

Object.keys(_app).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _app[key];
    }
  });
});

var _dispatch = require('./dispatch');

Object.keys(_dispatch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _dispatch[key];
    }
  });
});

var _application = require('./application');

Object.defineProperty(exports, 'Application', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_application).default;
  }
});

var _plugin = require('./plugin');

Object.defineProperty(exports, 'Plugin', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_plugin).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }