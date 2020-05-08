
import Plugin from '../src/plugin'
import { getApp } from '../src/app'

test('plugin no options is ok', () => {
  const app = getApp()
  new Plugin(app)
})

test('plugin#runTask,stopTask is ok', () => {
  const app = getApp()
  let ret = false
  let unret = false
  let task2 = 0
  const p = new Plugin(app, {
    tasks: {
      task1 () {
        ret = true
        return function () {
          unret = true
        }
      },
      task2 () {
        task2 = 1
        return function () {
          task2 = 2
        }
      }
    }
  })

  app.plugins.push(p)

  p.runTask()

  expect(ret).toBe(true)
  expect(task2).toBe(1)

  p.stopTask('task2')
  expect(task2).toBe(2)

  p.stopTask()
  expect(unret).toBe(true)
})

test('plugin#runExtend,stopExtend is ok', () => {
  const app = getApp()
  const p = new Plugin(app, {
    extends: {
      foo: '123'
    }
  })

  app.plugins.push(p)

  p.mount()

  expect(app.foo).toBe('123')

  p.unmount()
  expect(app.foo).toBeUndefined()
})

test('plugin#runFeature,stopFeature is ok', () => {
  const app = getApp()
  let ret = false
  let unret = false
  app.use({
    register: {
      feature: {
        name: 'test',
        test (opt) {
          return opt.test
        },
        mount () {
          ret = true
        },
        unmount () {
          unret = true
        }
      }
    }
  })
  const p = new Plugin(app, {
    test: true
  })

  app.plugins.push(p)

  p.runFeature()
  expect(ret).toBe(true)

  p.stopFeature()
  expect(unret).toBe(true)
})
