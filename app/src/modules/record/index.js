import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View, FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import { fetchNewExercises } from '../../api/newExercises';
import NewExercise from './components/NewExercise';
import {
  exercisesToRecordSelector,
  updateNewExercise,
} from './redux';

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchNewExercises,
  updateNewExercise,
}, dispatch);

export const mapStateToProps = state => ({
  exercisesToRecord: exercisesToRecordSelector(state),
  record: state.record,
});

export class App extends PureComponent {
  static propTypes = {
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
    })).isRequired,
    fetchNewExercises: PropTypes.func.isRequired,
    record: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
    }).isRequired,
    updateNewExercise: PropTypes.func.isRequired,
  }

  static navigationOptions = {
    title: 'Record',
  }

  componentDidMount() {
    this.props.fetchNewExercises(1);
  }

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
          <FlatList
            data={exercisesToRecord}
            renderItem={({ item, index }) => (
              <NewExercise
                index={index}
                type={item.type}
                reps={item.reps}
                timeStamp={moment.unix(item.timeStamp).utcOffset(-8).format('h:mm:ss a')}
                weight={item.weight}
                submitButtonColor={(item.weight && item.reps) ? '#9CCC65' : '#9E9E9E'}
                onChange={this.props.updateNewExercise}
              />)}
            keyExtractor={(item, index) => index}
          />
        }
        {
          (!exercisesToRecord || isLoading) &&
          <Text>Put a loader in here</Text>
        }
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
