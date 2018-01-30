import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, StyleSheet, Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCurrentExercises } from './redux';

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

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCurrentExercises,
}, dispatch);

const mapStateToProps = state => ({
  record: state.record,
});

class record extends PureComponent { 

  componentWillMount() {
    this.props.fetchCurrentExercises(5);
  }

  render() {
    const {
      navigation,
    } = this.props;
    return (
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
  }
}

record.propTypes = {
  fetchCurrentExercises: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

record.navigationOptions = {
  title: 'Record',
};

export default connect(mapStateToProps, mapDispatchToProps)(record);
