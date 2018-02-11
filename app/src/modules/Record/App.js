import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
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
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCurrentExercises,
}, dispatch);

export const mapStateToProps = state => ({
  record: state.record,
});

export class App extends PureComponent {
  componentDidMount() {
    this.props.fetchCurrentExercises(5);
  }

  render() {
    const {
      record: {
        data,
        isLoading,
      },
    } = this.props;
    return (
      <View style={styles.container}>
        {
          data &&
          data.map((x, i) => <Text key={i}>Exercise: {x.type} reps: {x.reps} </Text>)
        }
        {
          (!data || isLoading) &&
          <Text>Put a loader in here</Text>
        }
      </View>
    );
  }
}

App.propTypes = {
  fetchCurrentExercises: PropTypes.func.isRequired,
  record: PropTypes.shape({
    data: PropTypes.any,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
};

App.navigationOptions = {
  title: 'Record',
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
