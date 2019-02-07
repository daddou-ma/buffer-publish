import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Text } from '@bufferapp/components';
import { Row } from '@bufferapp/publish-shared-components';

const TimeFormatPreferences = () => (
  <Row>
    <Text color={'black'} size={'mini'}>Time format</Text>
    <form>
      <Field component="input" type="radio" id="twelveHourFormat" name="format" value="12" />
      <label htmlFor="twelveHourFormat" style={{ marginRight: '.5rem' }}>
        <Text color={'outerSpace'} size={'small'}>12 hour</Text>
      </label>
      <Field component="input" type="radio" id="twentyFourHourFormat" name="format" value="24" />
      <label htmlFor="twentyFourHourFormat">
        <Text color={'outerSpace'} size={'small'}>24 hour</Text>
      </label>
    </form>
  </Row>
);

TimeFormatPreferences.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'time-format-preferences',
})(TimeFormatPreferences);
