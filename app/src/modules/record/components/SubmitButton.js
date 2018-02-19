import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableHighlight,
  Text,
  View,
} from 'react-native';

export default class NumberInput extends PureComponent {
  static propTypes = {
    color: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  onPress = () => this.props.onPress();

  render() {
    const {
      color,
    } = this.props;
    return (
      <TouchableHighlight
        underlayColor="white"
        onPress={this.onPress}
      >
        <View style={{
          backgroundColor: color,
          borderRadius: 4,
          height: 30,
          justifyContent: 'center',
          padding: 5,
        }}
        >
          <Text style={{
            color: 'white',
          }}
          >
            Submit
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}
