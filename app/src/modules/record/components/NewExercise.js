import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
} from 'react-native';
import NumberInput from './NumberInput';
import SubmitButton from './SubmitButton';

export default class NewExercise extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    reps: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    submitButtonColor: PropTypes.string.isRequired,
    submitButtonOnPress: PropTypes.func.isRequired,
    timeStamp: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    weight: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  static defaultProps = {
    reps: '',
    weight: '',
  };

  onChange = (id, key) => value => this.props.onChange(id, key, value);

  render() {
    const {
      id,
      type,
      reps,
      submitButtonColor,
      submitButtonOnPress,
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
          <Text>{type}</Text>
          <Text>{timeStamp}</Text>
        </View>
        <Text>reps:</Text>
        <NumberInput
          onChange={this.onChange(id, 'reps')}
          value={reps}
        />
        <Text>weight:</Text>
        <NumberInput
          onChange={this.onChange(id, 'weight')}
          value={weight}
        />
        <SubmitButton
          id={id}
          color={submitButtonColor}
          onPress={submitButtonOnPress}
        />
      </View>
    );
  }
}
