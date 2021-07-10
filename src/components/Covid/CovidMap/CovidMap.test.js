import React from 'react';
import { shallow } from 'enzyme';
import CovidMap from './CovidMap';

describe('<CovidMap />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<CovidMap />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
