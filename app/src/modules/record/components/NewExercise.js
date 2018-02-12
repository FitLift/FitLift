import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
} from 'react-native';
import moment from 'moment-timezone';
import NumberInput from './NumberInput';
import SubmitButton from './SubmitButton';

export default class NewExercise extends PureComponent {
  static propTypes = {
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
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

  onChange = (index, key) => value => this.props.onChange(index, key, value);

  render() {
    const {
      index,
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
        <NumberInput
          onChange={this.onChange(index, 'reps')}
          value={reps}
        />
        <Text>weight:</Text>
        <NumberInput
          onChange={this.onChange(index, 'weight')}
          value={weight}
        />
        <SubmitButton
          onPress={f => f}
          opacity={1}
        />
      </View>
    );
  }
}
