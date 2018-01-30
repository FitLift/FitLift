import React from 'react';
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

const Friends = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.instructions}>
      This is where you will be able to see your friends workouts.
    </Text>
  </View>
);

Friends.navigationOptions = {
  title: 'feed',
};

export default Friends;
