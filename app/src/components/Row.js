import React from 'react';
import styled from 'styled-components';

const RowText = styled.Text`
  font-size: 14;
`;

export const StyledRowCell = styled.View`
  width: 75px;
  height: 100%;
  justifyContent: center;
  alignItems: center;
`;

export const StyledExercise = StyledRowCell.extend`
  width: 100px;
  alignItems: flex-start;
`;

export const RowStyle = styled.View`
  alignItems: center;
  borderBottomWidth: 1px;
  flexDirection: row;
  height: 70px;
  justifyContent: space-around;
`;

export const RowCell = ({ text }) => (
  <StyledRowCell>
    <RowText>{text}</RowText>
  </StyledRowCell>
);

export const ExerciseRowCell = ({ text }) => (
  <StyledExercise>
    <RowText>{text}</RowText>
  </StyledExercise>
);

