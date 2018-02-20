import React, { PureComponent } from 'react';
import { TouchableHighlight, Text, View } from 'react-native';
import { ChevronRightIcon, DumbbellIcon } from '../../../components/icons/';

export default class ExerciseDate extends PureComponent {

  onPress = () => this.props.onPress('SAMPLE_USER', '11/01/2017')

  render() {
    const {
      item,
    } = this.props;
    return (
      <TouchableHighlight
        underlayColor="white"
        onPress={this.onPress}
      >
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#F7F8FC',
            borderRadius: 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            marginVertical: 3,
            paddingVertical: 10,
          }}
        >
          <DumbbellIcon />
          <Text style={{
            fontSize: 20,
          }}
          >
            {item}
          </Text>
          <ChevronRightIcon />
        </View>
      </TouchableHighlight>
    );
  }
}

