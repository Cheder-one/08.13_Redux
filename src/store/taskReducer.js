import actionTypes from "./actionTypes";

const { TASK_UPDATED, ADD_TASK } = actionTypes;

function taskReducer(state, action) {
  switch (action.type) {
    case TASK_UPDATED:
      return state.map((task) => {
        return task.id === action.payload.id
          ? { ...task, ...action.payload }
          : task;
      });
    case ADD_TASK:
      return [...state, action.payload];

    default:
      return state;
  }
}

export default taskReducer;
