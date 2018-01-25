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
    <Text style={styles.instructions}>
      login
    </Text>
    <Button
      onPress={() => navigation.dispatch({ type: 'Login' })}
      title="Log in"
    />
  </View>
);

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
};

Login.navigationOptions = {
  title: 'Log In',
};

export default Login;
