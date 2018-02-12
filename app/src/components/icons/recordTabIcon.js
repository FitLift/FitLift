import React from 'react';
import PropTypes from 'prop-types';
import { Foundation } from 'react-native-vector-icons';

export default function recordTabIcon({ tintColor }) {
  return (
    <Foundation
      name="record"
      size={26}
      style={{ color: tintColor }}
    />
  );
}

recordTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
