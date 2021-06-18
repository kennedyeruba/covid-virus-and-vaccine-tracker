import React from 'react';
import { shallow } from 'enzyme';
import Navigation from './Navigation';

describe('<Navigation />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Navigation />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
