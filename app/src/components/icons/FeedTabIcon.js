import React from 'react';
import PropTypes from 'prop-types';
import { Foundation } from 'react-native-vector-icons';

export default function FeedTabIcon({ tintColor }) {
  return (
    <Foundation
      name="list-bullet"
      size={26}
      style={{ color: tintColor }}
    />
  );
}

FeedTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
