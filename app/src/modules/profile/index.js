import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ExerciseDate from './components/ExerciseDate';
import {
  displayExerciseDay,
} from './redux';

const data = [
  '11/01/2017',
  '11/02/2017',
  '11/03/2017',
  '11/04/2017',
  '11/05/2017',
  '11/06/2017',
];

const mapDispatchToProps = dispatch => bindActionCreators({
  displayExerciseDay,
}, dispatch);

export const mapStateToProps = state => ({
  state,
});

class App extends PureComponent {
  static propTypes = {
    displayExerciseDay: PropTypes.func.isRequired,
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <Button
        title="Logout"
        onPress={() => navigation.dispatch({ type: 'logout' })}
      />
    ),
    title: 'Profile',
  })

  onPress = (user, day) => this.props.displayExerciseDay(user, day)

  render() {
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ExerciseDate item={item} onPress={this.onPress} />
          )}
        keyExtractor={(item, index) => index}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
