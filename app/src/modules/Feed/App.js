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
      Feed
    </Text>
    <Button
      onPress={() => navigation.dispatch({ type: 'Feed' })}
      title="Feed"
    />
  </View>
);

Friends.navigationOptions = {
  title: 'Feed',
};

export default Friends;
