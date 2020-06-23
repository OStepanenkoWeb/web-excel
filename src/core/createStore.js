export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'})
  let subscribes = []

  return {
    subscribe(fn) {
      subscribes.push(fn)
      return {
        unsubscribe() {
          subscribes = subscribes.filter(subscribe => subscribe !== fn)
        },
      }
    },
    dispatch(action) {
      state = rootReducer(state, action)
      subscribes.forEach(subscribe => subscribe(state))
    },
    getState() {
      return state
    },
  }
}
