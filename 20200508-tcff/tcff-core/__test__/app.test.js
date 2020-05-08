import { getApp, createApp, useGlobalExtendPlugin } from '../src/app'

test('app is be ok', () => {
  const app = getApp()
  expect(app).toBeDefined()
})

test('app is singleton', () => {
  const app1 = createApp()
  const app2 = createApp()
  expect(app1).toEqual(app2)
})

test('useGlobalExtendPlugin is ok', () => {
  const t = {}
  useGlobalExtendPlugin(t, 'mapper2')
  const app = createApp()
  app.use({
    namespace: 'test',
    mapper2: {
      foo: 'bar'
    }
  })

  app.use({
    namespace: 'test2',
    mapper3: {
      foo: 'bar2'
    }
  })

  app.start()
  expect(t.test.foo).toBe('bar')

  app.disable('test')
})
