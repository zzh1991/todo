import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TableMeta } from 'src/features/home';

describe('home/TableMeta', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <TableMeta />
    );

    expect(
      renderedComponent.find('.home-table-meta').getElement()
    ).to.exist;
  });
});
