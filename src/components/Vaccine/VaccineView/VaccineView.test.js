import React from 'react';
import { shallow } from 'enzyme';
import VaccineView from './VaccineView';

describe('<VaccineView />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<VaccineView />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
