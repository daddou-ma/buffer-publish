import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { InputTime, InputWeekday } from '@bufferapp/components';

import { Button, Text } from '@bufferapp/ui';

const editScheduleStyle = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  marginBottom: '0.5rem',
};

const textWrapperStyle = {
  display: 'flex',
  marginRight: '0.5rem',
  marginBottom: '0.5rem',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,
};

const chooseDaysAndTimeStyle = {
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
};

const inputTimeWrapper = {
  marginLeft: '0.5rem',
  marginRight: '1rem',
  width: '11rem',
};

const addPostingTimeStyle = {
  display: 'flex',
  flexGrow: 1,
};

const dayContainerStyle = {
  marginRight: '1rem',
};

const PostingTimeForm = ({ handleSubmit, submitting, twentyfourHourTime }) => (
  <form>
    <div style={editScheduleStyle}>
      <div style={textWrapperStyle}>
        <Text type="label">Add a new posting time</Text>
      </div>
      <div style={formStyle}>
        <div style={chooseDaysAndTimeStyle}>
          <div style={dayContainerStyle}>
            <Field name={'day'} component={InputWeekday} fontSize={'small'} />
          </div>
          <Text type="label">Choose times</Text>
          <div style={inputTimeWrapper}>
            <Field
              name={'time'}
              component={InputTime}
              select24Hours={twentyfourHourTime}
              fontSize={'small'}
            />
          </div>
          <div style={addPostingTimeStyle}>
            <Button
              type="primary"
              label="Add Posting Time"
              disabled={submitting}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  </form>
);

PostingTimeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  twentyfourHourTime: PropTypes.bool.isRequired,
};

PostingTimeForm.defaultProps = {
  submitting: false,
  twentyfourHourTime: false,
};

const mapStateToProps = state => {
  const timezone = state.settings ? state.settings.profileTimezone : null;
  const now = moment().tz(timezone);
  const day = { day: 'everyday' };
  const time = now
    ? {
        hours: now.hour(),
        minutes: now.minute(),
      }
    : {
        hours: 12,
        minutes: 0,
      };
  return {
    initialValues: {
      time,
      day,
    },
  };
};

const formConfig = { form: 'posting-time' };

export default connect(mapStateToProps)(reduxForm(formConfig)(PostingTimeForm));
