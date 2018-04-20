// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_UPDATE_TO_DO,
} from './constants';

export function updateToDo() {
  return {
    type: HOME_UPDATE_TO_DO,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_UPDATE_TO_DO:
      return {
        ...state,
        todoList: action.data,
      };

    default:
      return state;
  }
}
