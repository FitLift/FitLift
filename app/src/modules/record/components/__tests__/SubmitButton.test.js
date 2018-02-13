import React from 'react';
import renderer from 'react-test-renderer';
import SubmitButton from '../SubmitButton';

describe('render tests', () => {
  it('doesnt crash', () => {
    const rendered = renderer.create(
      <SubmitButton
        onPress={f => f}
        submitButtonColor="#9CCC65"
      />,
    ).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
