import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Text,
} from 'react-native';
import NumberInput from './NumberInput';
import SubmitButton from './SubmitButton';
import {
  HeaderColumn, ExerciseColumn,
} from '../../../components/Header';

const RowStyle = styled.View`
  alignItems: center;
  borderBottomWidth: 1px;
  flexDirection: row;
  height: 70px;
  justifyContent: space-around;
`;

export default class NewExercise extends PureComponent {
  static propTypes = {
    display: PropTypes.bool,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    reps: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    submitButtonOnPress: PropTypes.func.isRequired,
    timeStamp: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    weight: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  static defaultProps = {
    display: false,
    reps: '',
    weight: '',
  };

  onChange = (id, key) => value => this.props.onChange(id, key, value);

  render() {
    const {
      id,
      type,
      reps,
      display,
      submitButtonOnPress,
      timeStamp,
      weight,
    } = this.props;
    return (
      <RowStyle>
        <ExerciseColumn>
          <Text>{type}</Text>
          <Text>{timeStamp}</Text>
        </ExerciseColumn>
        <HeaderColumn>
          <NumberInput
            onChange={this.onChange(id, 'reps')}
            value={reps}
          />
        </HeaderColumn>
        <HeaderColumn>
          <NumberInput
            onChange={this.onChange(id, 'weight')}
            value={weight}
          />
        </HeaderColumn>
        <HeaderColumn>
          <SubmitButton
            id={id}
            display={display}
            onPress={submitButtonOnPress}
          />
        </HeaderColumn>
      </RowStyle>
    );
  }
}
