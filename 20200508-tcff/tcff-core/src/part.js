export default class Part {
  constructor (app) {
    this.app = app
  }

  get store () {
    return this.app.store
  }
}
