import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Text } from '@bufferapp/ui';

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  height: '1.5rem',
  alignItems: 'center',
  padding: '1rem 0',
};

const TimeFormatPreferences = () => (
  <div style={rowStyle}>
    <Text type="h3">Time format</Text>
    <form>
      <Field component="input" type="radio" id="twelveHourFormat" name="format" value="12" />
      <label htmlFor="twelveHourFormat" style={{ marginRight: '.5rem' }}>
        <Text type="label">12 hour</Text>
      </label>
      <Field component="input" type="radio" id="twentyFourHourFormat" name="format" value="24" />
      <label htmlFor="twentyFourHourFormat">
        <Text type="label">24 hour</Text>
      </label>
    </form>
  </div>
);

TimeFormatPreferences.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'time-format-preferences',
})(TimeFormatPreferences);
