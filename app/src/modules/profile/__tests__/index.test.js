import React from 'react';
import renderer from 'react-test-renderer';
import App from '../index';

describe('render tests', () => {
  it('doesnt crash', () => {
    const props = {
      navigation: {},
    };
    const rendered = renderer.create(
      <App {...props} />,
    ).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
