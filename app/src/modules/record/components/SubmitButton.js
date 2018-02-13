import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableHighlight,
  Text,
  View,
} from 'react-native';

export default class NumberInput extends PureComponent {
  static propTypes = {
    submitButtonColor: PropTypes.string.isRequired,
  };

  onPress = (e) => {
    console.log(e);
  }

  render() {
    const {
      submitButtonColor,
    } = this.props;
    return (
      <TouchableHighlight
        underlayColor="white"
        onPress={this.onPress}
      >
        <View style={{
          backgroundColor: submitButtonColor,
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
