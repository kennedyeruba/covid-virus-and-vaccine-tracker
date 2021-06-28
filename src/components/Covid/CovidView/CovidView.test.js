import React from 'react';
import { shallow } from 'enzyme';
import CovidView from './CovidView';

describe('<CovidView />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<CovidView />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
