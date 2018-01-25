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

Friends.propTypes = {
  navigation: PropTypes.object.isRequired,
};

Friends.navigationOptions = {
  title: 'Feed',
};

export default Friends;
