import { useEffect, useState } from "react";

function taskReducer(state, action) {
  switch (action.type) {
    case "tasks/completed":
      state = state.map((task) => {
        return task.id === action.payload.id
          ? { ...task, completed: true }
          : task;
      });
      break;

    default:
      break;
  }

  return state;
}

function createStore(reducer, initState) {
  let state = initState;
  let listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    // Notify all listeners that the state has changed.
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  return { getState, dispatch, subscribe };
}

const initState = [
  { id: 1, description: "Task 1", completed: false },
  { id: 2, description: "Task 2", completed: false },
];
const store = createStore(taskReducer, initState);

const App = () => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
      console.log(store.getState());
    });
  }, []);

  // const actionAddTask = {
  //   type: "ADD_TASK",
  //   payload: {
  //     id: 3,
  //     description: "Task 2",
  //     completed: false,
  //   },
  // };

  const handleCompleteTask = (taskId) => {
    const actionCompleteTask = {
      type: "tasks/completed",
      payload: { id: taskId },
    };

    store.dispatch(actionCompleteTask);
    console.table(store.getState());
  };

  return (
    <>
      <h1>App</h1>
      <p />
      {state.map((task) => (
        <li key={task.id}>
          <span>{task.description}</span>
          <span> {task.completed ? "✅" : "❌"}</span>
          <button onClick={() => handleCompleteTask(task.id)}>Complete</button>
          <hr />
        </li>
      ))}
    </>
  );
};

export default App;
