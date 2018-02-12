import React from 'react';
import renderer from 'react-test-renderer';
import { App, mapStateToProps } from '../index';
import { new_exercises as newExercises } from '../../../api/db.json';

describe('render tests', () => {
  it('doesnt crash', () => {
    const props = {
      fetchNewExercises: f => f,
      navigation: {},
      newExercises: [],
      record: {
        isLoading: false,
      },
      updateNewExercise: f => f,
    };
    const rendered = renderer.create(
      <App
        {...props}
      />,
    ).toJSON();
    expect(rendered).toMatchSnapshot();
  });
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
