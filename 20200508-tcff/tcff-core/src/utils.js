export function createReducer (initialState, handlers) {
  return function reducer (state = {...initialState}, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

export function createEnhancer (funcs) {
  return function (origin, ...rest) {
    for (const func of funcs) {
      const enhancered = func(origin, ...rest)
      if (enhancered) {
        origin = enhancered
      }
    }
    return origin
  }
}
