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

const Record = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.instructions}>
      Record
    </Text>
    <Button
      onPress={() => navigation.dispatch({ type: 'Logout' })}
      title="Logout"
    />
  </View>
);

Record.propTypes = {
  navigation: PropTypes.object.isRequired,
};

Record.navigationOptions = {
  title: 'Record',
};

export default Record;
