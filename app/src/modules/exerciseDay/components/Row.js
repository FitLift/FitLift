import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  HeaderColumn,
  ExerciseColumnHeader,
} from '../../../components/Header';

const RowStyle = styled.View`
  alignItems: center;
  borderBottomWidth: 1px;
  flexDirection: row;
  height: 70px;
  justifyContent: space-around;
`;

const TextStyle = styled.Text`
  font-size: 14;
`;

export default class Row extends PureComponent {
  static propTypes = {
    exercise: PropTypes.shape({
      reps: PropTypes.string.isRequired,
      sets: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      weight: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const {
      exercise: {
        type,
        sets,
        reps,
        weight,
      },
    } = this.props;
    return (
      <RowStyle>
        <ExerciseColumnHeader>
          <TextStyle>{type}</TextStyle>
        </ExerciseColumnHeader>
        <HeaderColumn>
          <TextStyle>{sets}</TextStyle>
        </HeaderColumn>
        <HeaderColumn>
          <TextStyle>{reps}</TextStyle>
        </HeaderColumn>
        <HeaderColumn>
          <TextStyle>{weight}</TextStyle>
        </HeaderColumn>
      </RowStyle>
    );
  }
}
