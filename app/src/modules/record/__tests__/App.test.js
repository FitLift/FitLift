import React from 'react';
import renderer from 'react-test-renderer';
import { App } from '../App';

it('renders without crashing', () => {
  const props = {
    navigation: {},
    record: {
      data: null,
      isLoading: false,
    },
  };
  const rendered = renderer.create(
    <App
      fetchCurrentExercises={jest.fn()}
      {...props}
    />,
  ).toJSON();
  expect(rendered).toMatchSnapshot();
});
