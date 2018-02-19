import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
});

export default class App extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      index: PropTypes.number,
      routes: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.any,
        routeName: PropTypes.string,
        type: PropTypes.any,
      })),
    }).isRequired,
  }

  static navigationOptions = {
    title: 'Profile',
  }

  render() {
    const {
      navigation,
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          This is where you will be able to view your previous workouts.
        </Text>
        <Button
          onPress={() => navigation.dispatch({ type: 'logout' })}
          title="Log Out"
        />
      </View>
    );
  }
}
