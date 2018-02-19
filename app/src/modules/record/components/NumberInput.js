import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

export default class NumberInput extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  };

  onChangeText = (e) => {
    this.props.onChange(e);
  }

  render() {
    const {
      value,
    } = this.props;
    return (
      <TextInput
        maxLength={2}
        keyboardType="numeric"
        value={`${value}`}
        onChangeText={this.onChangeText}
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
