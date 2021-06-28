import React from 'react';
import { shallow } from 'enzyme';
import VaccineTable from './VaccineTable';

describe('<VaccineTable />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<VaccineTable />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
