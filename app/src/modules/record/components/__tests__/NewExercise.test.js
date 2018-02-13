import React from 'react';
import renderer from 'react-test-renderer';
import NewExercise from '../NewExercise';

describe('render tests', () => {
  it('doesnt crash', () => {
    const props = {
      index: 1,
      onChange: f => f,
      reps: 10,
      submitButtonColor: '#9CCC65',
      timeStamp: '7:53:24 pm',
      type: 'bicep curls',
      weight: 10,
    };
    const rendered = renderer.create(
      <NewExercise {...props} />,
    ).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
