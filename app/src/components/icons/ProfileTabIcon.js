import React from 'react';
import PropTypes from 'prop-types';
import { MaterialIcons } from 'react-native-vector-icons';

export default function ProfileTabIcon({ tintColor, focused }) {
  return (
    <MaterialIcons
      name={focused ? 'person' : 'person-outline'}
      size={26}
      style={{ color: tintColor }}
    />
  );
}

ProfileTabIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
  tintColor: PropTypes.string.isRequired,
};
