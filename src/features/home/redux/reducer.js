import initialState from './initialState';
import { reducer as addToDoReducer } from './addToDo';
import { reducer as getTodoListReducer } from './getTodoList';
import { reducer as updateToDoReducer } from './updateToDo';

const reducers = [
  addToDoReducer,
  getTodoListReducer,
  updateToDoReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
