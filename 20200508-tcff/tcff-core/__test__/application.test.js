import Application from '../src/application'
import Plugin from '../src/plugin'

let app
beforeEach(() => {
  app = new Application()
})

afterEach(() => {
  app = null
})

test('app#use is ok', () => {
  app.use({})
})

test('app#use support function arugments', () => {
  const ret = app.use(function (app, args) {
    return {}
  })
  expect(ret).toBeDefined()
})

test('app#use does not add same name plugin', () => {
  const plugin1 = app.use({
    namespace: 'test'
  })
  const plugin2 = app.use({
    namespace: 'test'
  })
  expect(plugin1).toEqual(plugin2)
})

test('app#use register is ok', () => {
  app.use({
    namespace: 'test',
    register: {
      family: {
        name: 'model',
        test: o => !!o.state
      },
      type: {
        family: 'model',
        test: options => (options.type === 'test'),
        ctor: class Test extends Plugin {}
      }
    }
  })

  app.use({
    namespace: 'mm',
    state: {},
    type: 'test'
  })

  // has family but no type
  app.use({
    namespace: 'mm2',
    state: {}
  })
})

test('app#use started will mount', () => {
  app.start()
  app.use({
    namespace: 'test'
  })
})

test('app#addPreset is ok', () => {
  app.addPreset('test', [{
    namespace: 'test'
  }, {
    namespace: 'test2333'
  }], () => {})

  // call preset
  app.preset('test', { test: 'j' })
  app.preset('test', { test2: 'j' })
})

test('app#preset is ok', () => {
  app.preset('test', {})
})

test('app#disable is ok', () => {
  app.use({
    namespace: 'test'
  })
  app.start()
  app.disable('test')
})

test('app#disable plugin not found is ok', () => {
  app.use({
    namespace: 'test'
  })
  app.start()
  app.disable('test2')
})

test('app#register family is ok', () => {
  app.register({
    family: {
      name: 'test'
    }
  })
  app.register({
    type: {
      family: 'test'
    }
  })
  app.register({
    feature: {
      name: 'test'
    }
  })
})

test('app#getFamily is ok', () => {
  app.getFamily('test')
})

test('app#getPlugin is ok', () => {
  app.getPlugin('test')
})

test('app#getExtra is ok', () => {
  app.use({
    extras: {
      reducers: {
        test: {}
      },
      middlewares: [{}],
      flowEnhancer: () => {}
    }
  })
  app.use({
    extras: {
      reducers: {
        test2: {}
      },
      flowEnhancer: () => {},
      middlewares: [{}]
    }
  })
  const reducers = app.getExtra('reducers')
  const enhancer = app.getExtra('flowEnhancer')
  const mds = app.getExtra('middlewares')

  expect(reducers).toBeTruthy()
  expect(typeof enhancer).toBe('function')
  expect(Array.isArray(mds)).toBe(true)
})

test('app#getIntercept is ok', () => {
  app.use({
    hooks: {
      test () {}
    }
  })
  const a = app.getIntercept('test')

  expect(a.length).toBe(1)
})

test('app#getContext is ok', () => {
  app.use({
    hooks: {
      context (context) { context.test = 'foo' }
    }
  })
  const a = app.getContext()

  expect(a.test).toBe('foo')
})

test('app#emit is ok', () => {
  app.use({
    hooks: {
      test: () => {}
    }
  })
  app.use({
    hooks: {
      test: () => false
    }
  })
  app.emit('test')
})

test('app#runTask is ok', () => {
  app.use({
    namespace: 'test',
    task: {
      test: () => {}
    }
  })

  app.runTask('test')
})

test('app#stopTask is ok', () => {
  app.use({
    namespace: 'test',
    task: {
      test: () => {}
    }
  })

  app.stopTask('test', 'test')
})

test('app#onError is ok', () => {
  app.onError('test')
  app.onError(Error('test'))
  app.onError()
})

test('app#start will invoke start hook', () => {
  let ret
  const plugin = app.use({
    namespace: 'test',
    hooks: {
      start: () => { ret = true }
    }
  })
  plugin.mount()
  app.start()
  expect(ret).toBe(true)
})

test('app#inject is ok', () => {
  app.inject({ ha: 'bar' })
  expect(app._inject.ha).toBe('bar')
})

test('app#start is ok', () => {
  app.start()
})

test('app#getPlugin is ok', () => {
  app.use({
    namespace: 'test'
  })
  const plugin = app.getPlugin('test')
  expect(plugin.namespace).toBe('test')
})

test('app#getPlugin is ok', () => {
  const family = app.getFamily('test')
  expect(family).toBeUndefined()

  app.register({
    family: {
      name: 'test2'
    }
  })
  const family2 = app.getFamily('test2')
  expect(family2.name).toBe('test2')
})
