import React from 'react';
import { shallow } from 'enzyme';
import CovidChart from './CovidChart';

describe('<CovidChart />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<CovidChart />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
