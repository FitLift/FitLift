import React from 'react';
import PropTypes from 'prop-types';
import { Button, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const login = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      login
    </Text>
    <Button
      onPress={() => navigation.dispatch({ type: 'login' })}
      title="Log in"
    />
  </View>
);

login.navigationOptions = {
  title: 'Log In',
};

export default login;
