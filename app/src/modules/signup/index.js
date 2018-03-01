import React from 'react';
import { Button, Text, View } from 'react-native';

const signup = ({ navigation }) => (
  <View>
    <Text>login</Text>
    <Button
      onPress={() => navigation.dispatch({ type: 'signup' })}
      title="Sign up"
    />
  </View>
);

signup.navigationOptions = {
  title: 'Sign up'
};

export default signup;
