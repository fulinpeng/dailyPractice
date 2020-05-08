import Plugin from './plugin'
import { createEnhancer } from './utils'

export default class Application {
  store = null
  plugins = [] // 插件集合

  _inject = {}
  _presets = {}
  _pluginFamilies = []
  _pluginTypes = []
  _pluginFeatures = []

  started = false
  render = null
  getReducer = null

  /**
   * 向应用程序成员中注入数据
   * @param {object} obj - 注入对象
   * @param {string} [member] - 注入的成员
   */
  inject (obj, member = '_inject') {
    Object.keys(obj).forEach(key => {
      this[member][key] = obj[key]
    })
  }

  /**
   * 使用插件
   * @param {object} options - 插件可选项
   * @param {object} args - 插件配置参数
   */
  use = (options, args) => {
    if (typeof options === 'function') {
      options = options(this, args)
    }
    let plugin = this.plugins.find(p => p.namespace != null && p.namespace === options.namespace)

    // 同名的插件不会重复添加
    if (!plugin) {
      // register
      if (options.register) {
        this.register(options.register)
      }

      const family = this._pluginFamilies.find(f => f.test(options))
      const type = this._pluginTypes
        .find(t =>
          ((family && t.family === family.name) || !family) && t.test(options)) ||
          (family && { ctor: family.defaultType })

      let Ctor = (type && type.ctor) || Plugin

      plugin = new Ctor(this, options)

      plugin.meta.family = family && family.name
      plugin.meta.type = Ctor.name

      this.plugins.push(plugin)

      if (this.started) {
        plugin.mount()
      }
    }

    return plugin
  }

  /**
   * 添加预设
   * @param {string} name - 预设的名称
   * @param {Array} plugins - 插件数组
   * @param {function} cb - 预设添加后执行的方法
   */
  addPreset (name, plugins, cb) {
    this._presets[name] = (options) => {
      plugins.map(plugin => {
        const opt = options &&
          (options[plugin.OPTIONS_NAME || plugin.namespace] || options)
        this.use(plugin, opt)
      })
      cb && cb()
    }
  }

  /**
   * 使用预设
   * @param {string} name - 预设名称
   * @param {object} args - 预设的配置参数
   */
  preset (name, args) {
    this._presets[name] && this._presets[name](args)
  }

  /**
   * 禁用插件
   * @param {string} namespace - 插件名称
   */
  disable (namespace) {
    // remove from plugin collection
    const idx = this.plugins.findIndex(plugin => {
      return plugin.namespace === namespace
    })
    if (idx < 0) {
      return
    }
    const plugin = this.plugins[idx]
    this.plugins.splice(idx, 1)
    plugin.unmount()
  }

  register (options) {
    if (options.family) {
      this._pluginFamilies.push(options.family)
    }
    if (options.type) {
      this._pluginTypes.push(options.type)
    }
    if (options.feature) {
      this._pluginFeatures.push(options.feature)
    }
  }

  getFamily (name) {
    return this._pluginFamilies.find(f => f.name === name)
  }

  getPlugin (namespace) {
    return this.plugins.find(plugin => plugin.namespace === namespace)
  }

  getExtra (name) {
    const extras = this.plugins.reduce((extras, plugin) => {
      if (plugin.extras && plugin.extras[name]) {
        extras.push(plugin.extras[name])
      }
      return extras
    }, [])

    if (extras.length) {
      // 函数就进行组合
      if (typeof extras[0] === 'function') {
        return createEnhancer(extras)
      } else {
        let ret
        if (Array.isArray(extras[0])) {
          ret = []
          for (const extra of extras) {
            ret = [
              ...ret,
              ...extra
            ]
          }
        } else {
          // 对象就进行合并
          ret = {}
          for (const extra of extras) {
            ret = {
              ...ret,
              ...extra
            }
          }
        }

        return ret
      }
    }
  }

  getIntercept (name) {
    return this.plugins.reduce((intercepts, plugin) => {
      if (plugin.hooks && plugin.hooks[name]) {
        intercepts.push(plugin.hooks[name])
      }
      return intercepts
    }, [])
  }

  getContext (model) {
    const intercept = this.getIntercept('context')
    const context = {}
    intercept.forEach(func => func(context, model))
    return context
  }

  emit (name, ...payload) {
    const handlers = this.getIntercept(name)
    if (handlers.length) {
      for (const handler of handlers) {
        const ret = handler(...payload)
        if (ret === false) {
          break
        }
      }
    }
  }

  runTask (namespace, name) {
    this.plugins.filter(plugin => plugin.namespace === namespace).forEach(plugin => {
      plugin.runTask(name)
    })
  }

  stopTask (namespace, name) {
    this.plugins.filter(plugin => plugin.namespace === namespace).forEach(plugin => {
      plugin.stopTask(name)
    })
  }

  onError = (err) => {
    if (err) {
      if (typeof err === 'string') {
        err = new Error(err)
      }
      this.emit('error', err)
    }
  }

  start (options = {}) {
    if (this.started) {
      return
    }
    this.emit('beforeStart', { app: this, options })

    this.plugins.forEach(plugin => {
      if (!plugin.mounted) {
        plugin.mount()
      }
    })

    this.emit('start', this)

    this.started = true
  }
}
