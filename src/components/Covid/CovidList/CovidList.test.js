import React from 'react';
import { shallow } from 'enzyme';
import CovidList from './CovidList';

describe('<CovidList />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<CovidList />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
