import React from 'react';
import styled from 'styled-components';

export const Header = styled.View`
  backgroundColor: #FB8C00;
  height: 50px;
  flexDirection: row;
  justifyContent: space-around;
  alignItems: center;
`;

export const HeaderColumn = styled.View`
  width: 75px;
  height: 70px;
  justifyContent: center;
  alignItems: center;
`;

export const ExerciseColumnHeader = HeaderColumn.extend`
  width: 100px;
  alignItems: flex-start;
`;

export const ExerciseColumn = HeaderColumn.extend`
  width: 100px;
`;

export const HeaderText = styled.Text`
  fontSize: 20;
  color: #FBE9E7;
`;

export const HeaderThing = ({ text }) => (
  <HeaderColumn>
    <HeaderText>{text}</HeaderText>
  </HeaderColumn>
);

export const ExerciseThing = ({ text }) => (
  <ExerciseColumn>
    <HeaderText>{text}</HeaderText>
  </ExerciseColumn>
);
