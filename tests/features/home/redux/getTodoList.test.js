import { expect } from 'chai';

import {
  HOME_GET_TODO_LIST,
} from 'src/features/home/redux/constants';

import {
  getTodoList,
  reducer,
} from 'src/features/home/redux/getTodoList';

describe('home/redux/getTodoList', () => {
  it('returns correct action by getTodoList', () => {
    expect(getTodoList()).to.have.property('type', HOME_GET_TODO_LIST);
  });

  it('handles action type HOME_GET_TODO_LIST correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_GET_TODO_LIST }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
