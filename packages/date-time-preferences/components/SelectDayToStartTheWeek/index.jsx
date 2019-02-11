import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Select, Text } from '@bufferapp/components';

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  height: '1.5rem',
  alignItems: 'center',
  padding: '1rem 0',
};

const DayToStartTheWeek = ({ input }) => (
  <Select
    value={input.value}
    color={'outerSpace'}
    options={[
      {
        value: 'Sunday',
        name: 'Sunday',
      },
      {
        value: 'Monday',
        name: 'Monday',
      },
    ]}
    onChange={input.onChange}
  />
);

DayToStartTheWeek.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.string,
  }).isRequired,
};

const SelectDayToStartTheWeek = () => (
  <div style={rowStyle}>
    <div>
      <Text color={'black'} size={'mini'}>Day to start the week</Text>
    </div>
    <div>
      <form style={{ minWidth: '185px' }}>
        <Field component={DayToStartTheWeek} name="dayToStartTheWeek" />
      </form>
    </div>
  </div>
);

SelectDayToStartTheWeek.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'day-to-start-the-week',
})(SelectDayToStartTheWeek);
