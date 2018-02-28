import React from 'react';
import { Button, Text, View } from 'react-native';

const login = ({ navigation }) => (
  <View>
    <Text>login</Text>
    <Button
      onPress={() => navigation.dispatch({ type: 'login' })}
      title="Log in"
    />
  </View>
);

login.navigationOptions = {
  title: 'Log In'
};

export default login;
