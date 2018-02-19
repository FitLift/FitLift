import React, { PureComponent } from 'react';
import { Button, Text, View } from 'react-native';

export default class App extends PureComponent {
  static navigationOptions = props => ({
    headerRight: (
      <Button
        title="Logout"
        onPress={() => props.navigation.dispatch({ type: 'logout' })}
      />
    ),
    title: 'Profile',
  })

  render() {
    return (
      <View>
        <Text>
          This is where you will be able to view your previous workouts.
        </Text>
      </View>
    );
  }
}
