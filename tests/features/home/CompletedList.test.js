import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { CompletedList } from 'src/features/home/CompletedList';

describe('home/CompletedList', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <CompletedList {...props} />
    );

    expect(
      renderedComponent.find('.home-completed-list').getElement()
    ).to.exist;
  });
});
