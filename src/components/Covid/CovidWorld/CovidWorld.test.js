import React from 'react';
import { shallow } from 'enzyme';
import CovidWorld from './CovidWorld';

describe('<CovidWorld />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<CovidWorld />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
