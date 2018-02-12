import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

export default class NumberInput extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  };

  render() {
    return (
      <TextInput
        maxLength={2}
        keyboardType="numeric"
        value={`${this.props.value}`}
        style={{
          borderColor: 'gray',
          borderRadius: 4,
          borderWidth: 1,
          fontSize: 15,
          height: 30,
          textAlign: 'center',
          width: 30,
        }}
      />
    );
  }
}
