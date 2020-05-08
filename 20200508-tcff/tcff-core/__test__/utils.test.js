
import { createEnhancer, createDevtools, actionSanitizer } from '../src/utils'

test('utils#createEnhancer is ok', () => {
  const enhancer = createEnhancer([
    (next) => {
      return (args) => {
        args += '1'
        return next(args)
      }
    },
    (next) => {
      return (args) => {
        args += '2'
        return next(args)
      }
    },
    (next) => {
      return (args) => {
        args = next(args)
        args += '3'
        return args
      }
    },
    (next) => {
      return (args) => {
        args = next(args)
        args += '4'
        return args
      }
    },
    (next) => {
    }
  ])
  const func = enhancer((args) => { args += '0'; return args })
  const ret = func('a')
  // 注意这里类似于洋葱圈
  expect(ret).toBe('a21034')
})
