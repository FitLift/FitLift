import React from 'react';
import renderer from 'react-test-renderer';
import { App, mapStateToProps } from '../App';
import { new_exercises as newExercises } from '../../../api/db.json';

it('renders without crashing', () => {
  const props = {
    navigation: {},
    newExercises,
    record: {
      isLoading: false,
    },
  };
  const rendered = renderer.create(
    <App
      fetchNewExercises={jest.fn()}
      {...props}
    />,
  ).toJSON();
  expect(rendered).toMatchSnapshot();
});

describe('mapStateToProps tests', () => {
  it('should work with intial state', () => {
    expect(mapStateToProps({
      db: {
        newExercises: [],
      },
      record: {
        isLoading: false,
      },
    })).toEqual({
      newExercises: [],
      record: {
        isLoading: false,
      },
    });
  });

  it('should work when loading', () => {
    expect(mapStateToProps({
      db: {
        newExercises: [],
      },
      record: {
        isLoading: true,
      },
    })).toEqual({
      newExercises: [],
      record: {
        isLoading: true,
      },
    });
  });

  it('should work with new exercises', () => {
    expect(mapStateToProps({
      db: {
        newExercises,
      },
      record: {
        isLoading: false,
      },
    })).toEqual({
      newExercises,
      record: {
        isLoading: false,
      },
    });
  });
});
