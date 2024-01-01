function createStore(reducer, initState) {
  let state = initState;
  let listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);

    listeners.forEach((listener) => listener());
    // Notify all listeners that the state has changed.
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  return { getState, dispatch, subscribe };
}

export default createStore;
