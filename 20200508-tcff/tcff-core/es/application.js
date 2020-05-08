var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Plugin from './plugin';
import { createEnhancer } from './utils';

var Application = function () {
  function Application() {
    var _this = this;

    _classCallCheck(this, Application);

    this.store = null;
    this.plugins = [];
    this._inject = {};
    this._presets = {};
    this._pluginFamilies = [];
    this._pluginTypes = [];
    this._pluginFeatures = [];
    this.started = false;
    this.render = null;
    this.getReducer = null;

    this.use = function (options, args) {
      if (typeof options === 'function') {
        options = options(_this, args);
      }
      var plugin = _this.plugins.find(function (p) {
        return p.namespace != null && p.namespace === options.namespace;
      });

      // 同名的插件不会重复添加
      if (!plugin) {
        // register
        if (options.register) {
          _this.register(options.register);
        }

        var family = _this._pluginFamilies.find(function (f) {
          return f.test(options);
        });
        var type = _this._pluginTypes.find(function (t) {
          return (family && t.family === family.name || !family) && t.test(options);
        }) || family && { ctor: family.defaultType };

        var Ctor = type && type.ctor || Plugin;

        plugin = new Ctor(_this, options);

        plugin.meta.family = family && family.name;
        plugin.meta.type = Ctor.name;

        _this.plugins.push(plugin);

        if (_this.started) {
          plugin.mount();
        }
      }

      return plugin;
    };

    this.onError = function (err) {
      if (err) {
        if (typeof err === 'string') {
          err = new Error(err);
        }
        _this.emit('error', err);
      }
    };
  } // 插件集合

  /**
   * 向应用程序成员中注入数据
   * @param {object} obj - 注入对象
   * @param {string} [member] - 注入的成员
   */
  Application.prototype.inject = function inject(obj) {
    var _this2 = this;

    var member = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_inject';

    Object.keys(obj).forEach(function (key) {
      _this2[member][key] = obj[key];
    });
  };

  /**
   * 使用插件
   * @param {object} options - 插件可选项
   * @param {object} args - 插件配置参数
   */


  /**
   * 添加预设
   * @param {string} name - 预设的名称
   * @param {Array} plugins - 插件数组
   * @param {function} cb - 预设添加后执行的方法
   */
  Application.prototype.addPreset = function addPreset(name, plugins, cb) {
    var _this3 = this;

    this._presets[name] = function (options) {
      plugins.map(function (plugin) {
        var opt = options && (options[plugin.OPTIONS_NAME || plugin.namespace] || options);
        _this3.use(plugin, opt);
      });
      cb && cb();
    };
  };

  /**
   * 使用预设
   * @param {string} name - 预设名称
   * @param {object} args - 预设的配置参数
   */


  Application.prototype.preset = function preset(name, args) {
    this._presets[name] && this._presets[name](args);
  };

  /**
   * 禁用插件
   * @param {string} namespace - 插件名称
   */


  Application.prototype.disable = function disable(namespace) {
    // remove from plugin collection
    var idx = this.plugins.findIndex(function (plugin) {
      return plugin.namespace === namespace;
    });
    if (idx < 0) {
      return;
    }
    var plugin = this.plugins[idx];
    this.plugins.splice(idx, 1);
    plugin.unmount();
  };

  Application.prototype.register = function register(options) {
    if (options.family) {
      this._pluginFamilies.push(options.family);
    }
    if (options.type) {
      this._pluginTypes.push(options.type);
    }
    if (options.feature) {
      this._pluginFeatures.push(options.feature);
    }
  };

  Application.prototype.getFamily = function getFamily(name) {
    return this._pluginFamilies.find(function (f) {
      return f.name === name;
    });
  };

  Application.prototype.getPlugin = function getPlugin(namespace) {
    return this.plugins.find(function (plugin) {
      return plugin.namespace === namespace;
    });
  };

  Application.prototype.getExtra = function getExtra(name) {
    var extras = this.plugins.reduce(function (extras, plugin) {
      if (plugin.extras && plugin.extras[name]) {
        extras.push(plugin.extras[name]);
      }
      return extras;
    }, []);

    if (extras.length) {
      // 函数就进行组合
      if (typeof extras[0] === 'function') {
        return createEnhancer(extras);
      } else {
        var ret = void 0;
        if (Array.isArray(extras[0])) {
          ret = [];
          for (var _iterator = extras, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var extra = _ref;

            ret = [].concat(ret, extra);
          }
        } else {
          // 对象就进行合并
          ret = {};
          for (var _iterator2 = extras, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
              if (_i2 >= _iterator2.length) break;
              _ref2 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done) break;
              _ref2 = _i2.value;
            }

            var _extra = _ref2;

            ret = _extends({}, ret, _extra);
          }
        }

        return ret;
      }
    }
  };

  Application.prototype.getIntercept = function getIntercept(name) {
    return this.plugins.reduce(function (intercepts, plugin) {
      if (plugin.hooks && plugin.hooks[name]) {
        intercepts.push(plugin.hooks[name]);
      }
      return intercepts;
    }, []);
  };

  Application.prototype.getContext = function getContext(model) {
    var intercept = this.getIntercept('context');
    var context = {};
    intercept.forEach(function (func) {
      return func(context, model);
    });
    return context;
  };

  Application.prototype.emit = function emit(name) {
    var handlers = this.getIntercept(name);
    if (handlers.length) {
      for (var _len = arguments.length, payload = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        payload[_key - 1] = arguments[_key];
      }

      for (var _iterator3 = handlers, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        }

        var handler = _ref3;

        var ret = handler.apply(undefined, payload);
        if (ret === false) {
          break;
        }
      }
    }
  };

  Application.prototype.runTask = function runTask(namespace, name) {
    this.plugins.filter(function (plugin) {
      return plugin.namespace === namespace;
    }).forEach(function (plugin) {
      plugin.runTask(name);
    });
  };

  Application.prototype.stopTask = function stopTask(namespace, name) {
    this.plugins.filter(function (plugin) {
      return plugin.namespace === namespace;
    }).forEach(function (plugin) {
      plugin.stopTask(name);
    });
  };

  Application.prototype.start = function start() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this.started) {
      return;
    }
    this.emit('beforeStart', { app: this, options: options });

    this.plugins.forEach(function (plugin) {
      if (!plugin.mounted) {
        plugin.mount();
      }
    });

    this.emit('start', this);

    this.started = true;
  };

  return Application;
}();

export default Application;