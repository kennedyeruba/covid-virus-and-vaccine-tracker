import React from 'react';
import { shallow } from 'enzyme';
import CovidTable from './CovidTable';

describe('<CovidTable />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<CovidTable />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
