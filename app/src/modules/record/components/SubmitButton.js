import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableHighlight,
  Text,
  View,
} from 'react-native';

export default class NumberInput extends PureComponent {
  static propTypes = {
  };

  onPress = (e) => {
    console.log(e);
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor="white"
        onPress={this.onPress}
      >
        <View style={{
          backgroundColor: '#9CCC65',
          borderRadius: 4,
          height: 30,
          justifyContent: 'center',
          opacity: this.props.opacity,
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
