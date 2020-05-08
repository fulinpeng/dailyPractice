function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import invariant from 'invariant';
import Part from './part';

/**
 * Plugin
 */

var Plugin = function (_Part) {
  _inherits(Plugin, _Part);

  function Plugin(app) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Plugin);

    var _this = _possibleConstructorReturn(this, _Part.call(this, app));

    _this.meta = { family: '', type: 'plugin', feature: [] };
    _this.hooks = {};
    _this.extras = {};
    _this.tasks = {};
    _this._untasks = {};
    _this.mounted = false;

    _this.options = options;
    Object.assign(_this, options);
    return _this;
  }

  /**
   * mount plugin
   */


  Plugin.prototype.mount = function mount() {
    this.store && this.store.updateReducer();
    this.runTask();
    this.runExtend();
    this.runFeature();

    this.mounted = true;
  };

  Plugin.prototype.unmount = function unmount() {
    this.stopFeature();
    this.stopTask();
    this.stopExtend();

    this.store && this.store.updateReducer();

    this.mounted = false;
  };

  Plugin.prototype.runTask = function runTask(name) {
    var _this2 = this;

    Object.entries(this.tasks).forEach(function (_ref) {
      var key = _ref[0],
          task = _ref[1];

      var un = task(_this2.app);
      _this2._untasks[key] = un;
    });
  };

  Plugin.prototype.stopTask = function stopTask(name) {
    var _this3 = this;

    Object.keys(this.tasks).filter(function (key) {
      return !name || key === name;
    }).map(function (key) {
      var untask = _this3._untasks[key];
      untask(_this3.app);
    });
  };

  Plugin.prototype.runExtend = function runExtend() {
    var _this4 = this;

    if (!this.extends) {
      return;
    }
    Object.entries(this.extends).forEach(function (_ref2) {
      var key = _ref2[0],
          value = _ref2[1];

      invariant(!_this4.app[key], 'There is already a member of the same name in application: ' + key);
      _this4.app[key] = value;
    });
  };

  Plugin.prototype.stopExtend = function stopExtend() {
    var _this5 = this;

    if (!this.extends) {
      return;
    }
    Object.entries(this.extends).forEach(function (_ref3) {
      var key = _ref3[0],
          value = _ref3[1];

      delete _this5.app[key];
    });
  };

  Plugin.prototype.runFeature = function runFeature() {
    var _this6 = this;

    this.app._pluginFeatures.map(function (_ref4) {
      var test = _ref4.test,
          mount = _ref4.mount,
          name = _ref4.name;

      if (test && test(_this6.options)) {
        name && _this6.meta.feature.push(name);
        mount(_this6, _this6.options);
      }
    });
    if (this.meta.feature.length === 0) {
      this.meta.feature.push('extension');
    }
  };

  Plugin.prototype.stopFeature = function stopFeature() {
    var _this7 = this;

    this.app._pluginFeatures.map(function (_ref5) {
      var test = _ref5.test,
          unmount = _ref5.unmount;

      if (test && test(_this7.options)) {
        unmount(_this7, _this7.options);
      }
    });
  };

  return Plugin;
}(Part);

export default Plugin;