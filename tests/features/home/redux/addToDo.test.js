import { expect } from 'chai';

import {
  HOME_ADD_TO_DO,
} from 'src/features/home/redux/constants';

import {
  addToDo,
  reducer,
} from 'src/features/home/redux/addToDo';

describe('home/redux/addToDo', () => {
  it('returns correct action by addToDo', () => {
    expect(addToDo()).to.have.property('type', HOME_ADD_TO_DO);
  });

  it('handles action type HOME_ADD_TO_DO correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_ADD_TO_DO }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
