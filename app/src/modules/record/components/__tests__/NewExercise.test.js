import React from 'react';
import renderer from 'react-test-renderer';
import NewExercise from '../NewExercise';

describe('render tests', () => {
  it('doesnt crash', () => {
    const props = {
      index: 1,
      onChange: f => f,
      reps: 10,
      timeStamp: 1518407604,
      type: 'bicep curls',
    };
    const rendered = renderer.create(
      <NewExercise {...props} />,
    ).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
