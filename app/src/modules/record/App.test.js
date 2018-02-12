import React from 'react';
import renderer from 'react-test-renderer';
import { mapStateToProps } from './App2';
import { new_exercises as newExercises } from '../../../api/db.json';

describe.skip('render tests', () => {
  it('doesnt crash', () => {
    const props = {
      navigation: {},
      newExercises,
      record: {
        isLoading: false,
      },
    };
    const rendered = renderer.create(
      <RenderContainer
        fetchNewExercises={jest.fn()}
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
