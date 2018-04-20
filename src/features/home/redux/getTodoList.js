// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_GET_TODO_LIST,
} from './constants';
import { selectData } from '../DbOperation';

export function getTodoList(data) {
  return {
    type: HOME_GET_TODO_LIST,
    data,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_GET_TODO_LIST:
      return {
        ...state,
        todoList: action.data,
      };

    default:
      return state;
  }
}
