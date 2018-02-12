import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchNewExercises } from '../../api/newExercises';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
  },
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchNewExercises,
}, dispatch);

export const mapStateToProps = state => ({
  newExercises: state.db.newExercises,
  record: state.record,
});

export class App extends PureComponent {
  componentDidMount() {
    this.props.fetchNewExercises(1);
  }

  render() {
    const {
      record: {
        isLoading,
      },
      newExercises,
    } = this.props;
    console.log(newExercises)
    return (
      <View style={styles.container}>
        {
          newExercises &&
          newExercises.map((x, i) => <Text key={i}>Exercise: {x.type} reps: {x.reps} </Text>)
        }
        {
          (!newExercises || isLoading) &&
          <Text>Put a loader in here</Text>
        }
      </View>
    );
  }
}

App.propTypes = {
  fetchNewExercises: PropTypes.func.isRequired,
  newExercises: PropTypes.arrayOf(PropTypes.shape({
    reps: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  record: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
};

App.navigationOptions = {
  title: 'Record',
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
