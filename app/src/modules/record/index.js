import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Text, View, FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import {
  createNewExercise,
  deleteNewExercise,
  fetchNewExercises,
  listenForNewExercises,
  postConfirmedExercise,
} from '../../api/newExercises';
import NewExercise from './components/NewExercise';
import {
  Header,
  ExerciseThing,
  HeaderThing,
} from './components/TableHeader';
import {
  exercisesToRecordSelector,
  updateNewExercise,
} from './redux';

const mapDispatchToProps = dispatch => bindActionCreators({
  createNewExercise,
  deleteNewExercise,
  fetchNewExercises,
  listenForNewExercises,
  postConfirmedExercise,
  updateNewExercise,
}, dispatch);

export const mapStateToProps = state => ({
  exercisesToRecord: exercisesToRecordSelector(state),
  record: state.record,
});

export class App extends PureComponent {
  static propTypes = {
    createNewExercise: PropTypes.func.isRequired,
    deleteNewExercise: PropTypes.func.isRequired,
    exercisesToRecord: PropTypes.arrayOf(PropTypes.shape({
      reps: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      timeStamp: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      weight: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })),
    fetchNewExercises: PropTypes.func.isRequired,
    listenForNewExercises: PropTypes.func.isRequired,
    record: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
    }).isRequired,
    updateNewExercise: PropTypes.func.isRequired,
  }

  static defaultProps = {
    exercisesToRecord: null,
  }

  static navigationOptions = {
    title: 'Record',
  }

  componentDidMount() {
    this.props.fetchNewExercises('SAMPLE_USER');
    this.props.listenForNewExercises('SAMPLE_USER');
  }

  submitButtonOnPress = exercise => () => this.props.deleteNewExercise(exercise);

  render() {
    const {
      record: {
        isLoading,
      },
      exercisesToRecord,
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {
          exercisesToRecord &&
          <View>
            <Header>
              <ExerciseThing text="Exercise" />
              <HeaderThing text="Reps" />
              <HeaderThing text="Weight" />
              <HeaderThing text="Submit" />
            </Header>
            <FlatList
              data={exercisesToRecord}
              renderItem={({ item }) => (
                <NewExercise
                  id={item.id}
                  type={item.type}
                  reps={item.reps}
                  timeStamp={moment.unix(item.timeStamp / 1000).tz('America/Los_Angeles').format('h:mm:ss a')}
                  weight={item.weight}
                  display={(item.weight && item.reps && !item.isConfirming)}
                  submitButtonOnPress={this.submitButtonOnPress({ ...item, user: 'SAMPLE_USER' })}
                  onChange={this.props.updateNewExercise}
                />)}
              keyExtractor={({ id }) => id}
            />
          </View>
        }
        {
          isLoading &&
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center' }}>Put a Loader here</Text>
          </View>
        }
        {
          !exercisesToRecord && !isLoading &&
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center' }}>No exercises to show!  Go work out!</Text>
          </View>
        }
        <Button
          title="create fake exercise"
          onPress={() => this.props.createNewExercise('Bicep Curls', 5)}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
