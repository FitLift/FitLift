import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View, FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchNewExercises } from '../../api/newExercises';
import NewExercise from './components/NewExercise';

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
    return (
      <View style={{ flex: 1 }}>
        {
          newExercises &&
          <FlatList
            data={newExercises}
            renderItem={({ item }) => (
              <NewExercise
                type={item.type}
                reps={item.reps}
                timeStamp={item.timeStamp}
              />)}
            keyExtractor={(item, index) => index}
          />
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
    timeStamp: PropTypes.number.isRequired,
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
