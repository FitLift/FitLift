import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableHighlight } from 'react-native';

// prettier-ignore
const OuterView = styled.View`
  flex: 1;
  justifyContent: center;
`;

// prettier-ignore
const WhiteText = styled.Text`
  color: white;
  fontSize: 18px;
`;

// prettier-ignore
const Button = styled.View`
  backgroundColor: #9CCC65;
  borderRadius: 4px;
  height: 40px;
  justifyContent: center;
  padding: 5px;
`;

const DeleteButton = Button.extend`
  background-color: #ff0000;
`;

export default class NumberInput extends PureComponent {
  static propTypes = {
    display: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired
  };

  onPress = () => {
    this.props.onPress();
  };

  onPressBad = () => {
    this.props.onPress(false);
  };

  render() {
    const { display } = this.props;
    return (
      <OuterView>
        {display && (
          <TouchableHighlight underlayColor="white" onPress={this.onPress}>
            <Button>
              <WhiteText>Submit</WhiteText>
            </Button>
          </TouchableHighlight>
        )}
        {!display && (
          <TouchableHighlight underlayColor="white" onPress={this.onPressBad}>
            <DeleteButton>
              <WhiteText>Delete</WhiteText>
            </DeleteButton>
          </TouchableHighlight>
        )}
      </OuterView>
    );
  }
}
