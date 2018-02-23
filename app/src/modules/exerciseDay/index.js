import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';
import {
  fetchExercises,
} from '../../api/exercises';
import {
  Header,
  ExerciseThing,
  HeaderThing,
  HeaderColumn,
  ExerciseColumn,
} from '../record/components/TableHeader';
import { exercisesSelector } from './redux';

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchExercises,
}, dispatch);

export const mapStateToProps = state => ({
  exercises: exercisesSelector(state),
});

const RowStyle = styled.View`
  alignItems: center;
  borderBottomWidth: 1px;
  flexDirection: row;
  height: 70px;
  justifyContent: space-around;
`;

const TextStyle = styled.Text`
  font-size: 18;
`;


export class App extends PureComponent {
  static propTypes = {
    exercises: PropTypes.arrayOf(PropTypes.shape({
      reps: PropTypes.string,
      sets: PropTypes.number,
      type: PropTypes.string,
      weight: PropTypes.string,
    })),
    fetchExercises: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}),
  }

  static defaultProps = {
    exercises: [],
    navigation: {},
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.day,
  })

  componentDidMount() {
    const {
      navigation: {
        state: {
          params: {
            day,
            user,
          },
        },
      },
    } = this.props;
    this.props.fetchExercises(user, day);
  }

  render() {
    const {
      exercises,
    } = this.props;
    return (
      <View>
        <Header>
          <ExerciseThing text="Exercise" />
          <HeaderThing text="Sets" />
          <HeaderThing text="Reps" />
          <HeaderThing text="Weight" />
        </Header>
        <FlatList
          data={exercises}
          renderItem={({ item }) => (
            <View>
              {
                Object.values(item.values).map((x, index) => (
                  <RowStyle key={index}>
                    <ExerciseColumn>
                      <TextStyle>{x.type}</TextStyle>
                    </ExerciseColumn>
                    <HeaderColumn>
                      <TextStyle>{x.sets}</TextStyle>
                    </HeaderColumn>
                    <HeaderColumn>
                      <TextStyle>{x.reps}</TextStyle>
                    </HeaderColumn>
                    <HeaderColumn>
                      <TextStyle>{x.weight}</TextStyle>
                    </HeaderColumn>
                  </RowStyle>
                ))
              }
            </View>
            )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
