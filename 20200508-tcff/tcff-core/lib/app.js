'use strict';

exports.__esModule = true;
exports.selector = exports.mapper = exports.globalApp = undefined;
exports.createApp = createApp;
exports.getApp = getApp;
exports.resetApp = resetApp;
exports.useGlobalExtendPlugin = useGlobalExtendPlugin;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _application = require('./application');

var _application2 = _interopRequireDefault(_application);

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globalApp = exports.globalApp = _window2.default.__tcffApp; // 保证单例，待商榷

function createApp() {
  if (globalApp == null) {
    exports.globalApp = globalApp = new _application2.default();
    _window2.default.__tcffApp = globalApp;
  }
  return globalApp;
}

function getApp() {
  return globalApp;
}

function resetApp() {
  exports.globalApp = globalApp = null;
  createApp();
  return globalApp;
}

function useGlobalExtendPlugin(target, name) {
  globalApp.use(function (app, options) {
    return {
      namespace: name,
      register: {
        feature: {
          name: name,
          test: function test(options) {
            return !!options[name];
          },
          mount: function mount(plugin, options) {
            (0, _invariant2.default)(!!options.namespace, 'global-extend plugin must be have \'namespace\' field');
            target[options.namespace] = options[name];
          },
          unmount: function unmount(plugin, options) {
            delete target[options.namespace];
          }
        }
      }
    };
  });
}

createApp();

var mapper = exports.mapper = {};
useGlobalExtendPlugin(mapper, 'mapper');

var selector = exports.selector = {};
useGlobalExtendPlugin(selector, 'selector');