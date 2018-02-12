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

const profile = ({ navigation }) => (
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

profile.propTypes = {
  navigation: PropTypes.object.isRequired,
};

profile.navigationOptions = {
  title: 'Profile',
};

export default profile;
