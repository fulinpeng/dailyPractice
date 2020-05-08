
import Part from '../src/part'
import { getApp } from '../src/app'

test('part create is ok', () => {
  const app = getApp()
  const part = new Part(app)
  expect(part.app).toBe(app)
  expect(part.store).toBe(app.store)
})