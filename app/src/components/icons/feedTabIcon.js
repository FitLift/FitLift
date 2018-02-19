import React from 'react';
import PropTypes from 'prop-types';
import { Foundation } from 'react-native-vector-icons';

export default function feedTabIcon({ tintColor }) {
  return (
    <Foundation
      name="list-bullet"
      size={30}
      style={{ color: tintColor }}
    />
  );
}

feedTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
