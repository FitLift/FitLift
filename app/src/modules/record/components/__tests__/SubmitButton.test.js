import React from 'react';
import renderer from 'react-test-renderer';
import SubmitButton from '../SubmitButton';

describe('render tests', () => {
  it('doesnt crash', () => {
    const rendered = renderer.create(
      <SubmitButton
        onPress={console.log(5)}
        opacity={1}
      />,
    ).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
