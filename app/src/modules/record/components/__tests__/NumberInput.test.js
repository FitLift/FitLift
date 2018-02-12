import React from 'react';
import renderer from 'react-test-renderer';
import NumberInput from '../NumberInput';

describe('render tests', () => {
  it('doesnt crash', () => {
    const rendered = renderer.create(
      <NumberInput
        onChange={f => f}
        value={5}
      />,
    ).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
