import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@bufferapp/components';
import TimeFormatPreferences from '../TimeFormatPreferences';
import SelectDayToStartTheWeek from '../SelectDayToStartTheWeek';

const DateTimePreferences = ({
  changeTwentyFourHourFormat,
  changeStartOfWeek,
  initialValues,
}) => (
  <div>
    <TimeFormatPreferences
      onChange={changeTwentyFourHourFormat}
      initialValues={initialValues}
    />
    <Divider />
    <SelectDayToStartTheWeek
      onChange={changeStartOfWeek}
      initialValues={initialValues}
    />
  </div>
);

DateTimePreferences.propTypes = {
  changeTwentyFourHourFormat: PropTypes.func.isRequired,
  changeStartOfWeek: PropTypes.func.isRequired,
};

export default DateTimePreferences;
