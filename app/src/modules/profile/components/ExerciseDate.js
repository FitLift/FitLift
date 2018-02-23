import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ChevronRightIcon, DumbbellIcon } from '../../../components/icons/';

const Button = styled.TouchableHighlight`
  backgroundColor: #F7F8FC;
  borderRadius: 4px;
  marginHorizontal: 10px;
  marginVertical: 5px;
  paddingVertical: 10px;
`;

const View = styled.View`
  alignItems: center;
  flexDirection: row;
  justifyContent: space-between;
`;

const Text = styled.Text`
  fontSize: 20px;
`;

export default class ExerciseDate extends PureComponent {
  static propTypes = {
    item: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  }

  onPress = () => this.props.onPress('SAMPLE_USER', this.props.item)

  render() {
    const { item } = this.props;
    return (
      <Button onPress={this.onPress} underlayColor="white">
        <View>
          <DumbbellIcon />
          <Text>{item}</Text>
          <ChevronRightIcon />
        </View>
      </Button>
    );
  }
}
