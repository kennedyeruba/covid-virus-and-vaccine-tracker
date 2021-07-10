import React from 'react';
import { shallow } from 'enzyme';
import CovidListSearch from './CovidListSearch';

describe('<CovidListSearch />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<CovidListSearch />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
