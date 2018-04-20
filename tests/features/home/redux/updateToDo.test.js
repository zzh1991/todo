import { expect } from 'chai';

import {
  HOME_UPDATE_TO_DO,
} from 'src/features/home/redux/constants';

import {
  updateToDo,
  reducer,
} from 'src/features/home/redux/updateToDo';

describe('home/redux/updateToDo', () => {
  it('returns correct action by updateToDo', () => {
    expect(updateToDo()).to.have.property('type', HOME_UPDATE_TO_DO);
  });

  it('handles action type HOME_UPDATE_TO_DO correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_TO_DO }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
