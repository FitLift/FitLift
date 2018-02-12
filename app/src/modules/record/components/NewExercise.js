import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableHighlight,
  Text,
  View,
} from 'react-native';
import moment from 'moment-timezone';
import NumberInput from './NumberInput';
import SubmitButton from './SubmitButton';

export default class NewExercise extends PureComponent {
  static propTypes = {
    reps: PropTypes.number.isRequired,
    timeStamp: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    weight: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  static defaultProps = {
    weight: '',
  };

  render() {
    const {
      type,
      reps,
      timeStamp,
      weight,
    } = this.props;
    return (
      <View style={{
        alignItems: 'center',
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: 'row',
        height: 70,
        justifyContent: 'space-around',
        }}
      >
        <View style={{ width: 100 }}>
          <Text>
            {type}
          </Text>
          <Text>
            {moment.unix(timeStamp).utcOffset(-8).format('h:mm:ss a')}
          </Text>
        </View>
        <Text>reps:</Text>
        <NumberInput value={reps} />
        <Text>weight:</Text>
        <NumberInput value={weight} />
        <SubmitButton
          onPress={console.log(5)}
          opacity={1}
        />
      </View>
    );
  }
}
