import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DetailView } from 'src/features/home';

describe('home/DetailView', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <DetailView />
    );

    expect(
      renderedComponent.find('.home-detail-view').getElement()
    ).to.exist;
  });
});
