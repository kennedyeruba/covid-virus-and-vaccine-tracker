import React from 'react';
import { shallow } from 'enzyme';
import CovidUser from './CovidUser';

describe('<CovidUser />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<CovidUser />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
