import { dispatch, promiseDispatch } from '../src/dispatch'
import { getApp } from '../src/app'
let app
beforeEach(() => {
  app = getApp()
})

test('dispatch is ok', () => {
  app.start()
  dispatch({
    type: 'test'
  })
})
test('promiseDispatch is ok', () => {
  app.start()
  const ret = promiseDispatch({
    type: 'test'
  })
  expect(typeof ret.then).toBe('function')
})
