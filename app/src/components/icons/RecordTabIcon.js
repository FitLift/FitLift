import React from 'react';
import PropTypes from 'prop-types';
import { Foundation } from 'react-native-vector-icons';

export default function RecordTabIcon({ tintColor }) {
  return (
    <Foundation
      name="record"
      size={26}
      style={{ color: tintColor }}
    />
  );
}

RecordTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
