import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DeletedList } from 'src/features/home/DeletedList';

describe('home/DeletedList', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DeletedList {...props} />
    );

    expect(
      renderedComponent.find('.home-deleted-list').getElement()
    ).to.exist;
  });
});
