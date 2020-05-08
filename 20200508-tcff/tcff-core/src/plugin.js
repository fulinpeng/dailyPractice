import invariant from 'invariant'
import Part from './part'

/**
 * Plugin
 */
export default class Plugin extends Part {
  namespace
  meta = { family: '', type: 'plugin', feature: [] }
  hooks = {}
  extras = {}
  tasks = {}
  _untasks = {}
  mounted = false
  constructor (app, options = {}) {
    super(app)
    this.options = options
    Object.assign(this, options)
  }

  /**
   * mount plugin
   */
  mount () {
    this.store && this.store.updateReducer()
    this.runTask()
    this.runExtend()
    this.runFeature()

    this.mounted = true
  }

  unmount () {
    this.stopFeature()
    this.stopTask()
    this.stopExtend()

    this.store && this.store.updateReducer()

    this.mounted = false
  }

  runTask (name) {
    Object.entries(this.tasks).forEach(([key, task]) => {
      const un = task(this.app)
      this._untasks[key] = un
    })
  }

  stopTask (name) {
    Object.keys(this.tasks).filter(key => !name || key === name).map(key => {
      const untask = this._untasks[key]
      untask(this.app)
    })
  }

  runExtend () {
    if (!this.extends) {
      return
    }
    Object.entries(this.extends).forEach(([key, value]) => {
      invariant(!this.app[key], `There is already a member of the same name in application: ${key}`)
      this.app[key] = value
    })
  }

  stopExtend () {
    if (!this.extends) {
      return
    }
    Object.entries(this.extends).forEach(([key, value]) => {
      delete this.app[key]
    })
  }

  runFeature () {
    this.app._pluginFeatures.map(({ test, mount, name }) => {
      if (test && test(this.options)) {
        name && this.meta.feature.push(name)
        mount(this, this.options)
      }
    })
    if (this.meta.feature.length === 0) {
      this.meta.feature.push('extension')
    }
  }

  stopFeature () {
    this.app._pluginFeatures.map(({ test, unmount }) => {
      if (test && test(this.options)) {
        unmount(this, this.options)
      }
    })
  }
}
