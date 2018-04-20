import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TodoList } from 'src/features/home/TodoList';

describe('home/TodoList', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <TodoList {...props} />
    );

    expect(
      renderedComponent.find('.home-todo-list').getElement()
    ).to.exist;
  });
});
