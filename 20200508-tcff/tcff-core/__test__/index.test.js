import * as tcffCore from '../src/index'

test('tcff-core all export is ok', () => {
  expect(tcffCore.getApp).toBeDefined()
  expect(tcffCore.mapper).toBeDefined()
  expect(tcffCore.selector).toBeDefined()
  expect(tcffCore.dispatch).toBeDefined()
  expect(tcffCore.Application).toBeDefined()
  expect(tcffCore.Plugin).toBeDefined()
})
