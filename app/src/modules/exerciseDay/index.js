import React, { PureComponent } from 'react';
import { Text } from 'react-native';

const get = () => 5;

export default class App extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.day,
  })

  componentDidMount() {
    console.log(get());
  }

  render() {
    return (
      <Text>Hello</Text>
    );
  }
}
