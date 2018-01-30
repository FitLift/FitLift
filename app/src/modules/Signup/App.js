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

const Login = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      login
    </Text>
    <Button
      onPress={() => navigation.dispatch({ type: 'Signup' })}
      title="Signup"
    />
  </View>
);

Login.navigationOptions = {
  title: 'Sign up',
};

export default Login;
