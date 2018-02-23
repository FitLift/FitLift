import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.View`
  backgroundColor: #FB8C00;
  height: 50px;
  flexDirection: row;
  justifyContent: space-around;
  alignItems: center;
`;

const HeaderText = styled.Text`
  fontSize: 20;
  color: #FBE9E7;
  width: 75;
  textAlign: center;
`;

const ExerciseHeaderText = HeaderText.extend`
  width: 100;
`;

export default ({ names }) => (
  <StyledHeader>
    <ExerciseHeaderText>{names[0]}</ExerciseHeaderText>
    <HeaderText>{names[1]}</HeaderText>
    <HeaderText>{names[2]}</HeaderText>
    <HeaderText>{names[3]}</HeaderText>
  </StyledHeader>
);
