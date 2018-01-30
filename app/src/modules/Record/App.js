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

const record = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.instructions}>
      record
    </Text>
    <Button
      onPress={() => navigation.dispatch({ type: 'record' })}
      title="record"
    />
  </View>
);

record.propTypes = {
  navigation: PropTypes.object.isRequired,
};

record.navigationOptions = {
  title: 'record',
};

export default record;
