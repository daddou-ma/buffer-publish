import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  InputAutocomplete,
  Text,
} from '@bufferapp/components';

const editTimezoneStyle = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  marginBottom: '0.5rem',
  width: '200px',
};

const textWrapperStyle = {
  display: 'flex',
  marginBottom: '0.5rem',
};

const formStyle = {
  display: 'flex',
  flexGrow: 1,
};

const chooseTimezoneStyle = {
  display: 'flex',
  flexGrow: 1,
};

const fieldStyle = {
  width: '100%',
};

const sortItems = (a, b, value) => {
  const aLower = a.label.toLowerCase();
  const bLower = b.label.toLowerCase();
  const valueLower = value.toLowerCase();
  const queryPosA = aLower.indexOf(valueLower);
  const queryPosB = bLower.indexOf(valueLower);
  if (queryPosA !== queryPosB) {
    return queryPosA - queryPosB;
  }
  return aLower < bLower ? -1 : 1;
};

let TimezoneInputForm = ({
  items,
  handleSubmit,
  onTimezoneInputFocus,
  onTimezoneInputBlur,
  onTimezoneChange,
}) => (
  <form>
    <div style={editTimezoneStyle}>
      <div style={textWrapperStyle}>
        <Text
          size="small"
          color="black"
          weight="thin"
        >
          Timezone
        </Text>
      </div>
      <div style={formStyle}>
        <div style={chooseTimezoneStyle}>
          <div style={fieldStyle}>
            <Field
              name="timezone"
              component={InputAutocomplete}
              items={items}
              placeholder={'Type a city...'}
              onChange={onTimezoneChange}
              onFocusHandler={onTimezoneInputFocus}
              onBlurHandler={onTimezoneInputBlur}
              onSelect={({ timezone, city }) => { handleSubmit({ timezone, city }); }}
              sortItems={sortItems}
            />
          </div>
        </div>
      </div>
    </div>
  </form>
  );

TimezoneInputForm.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
  })).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onTimezoneInputFocus: PropTypes.func.isRequired,
  onTimezoneInputBlur: PropTypes.func.isRequired,
  onTimezoneChange: PropTypes.func.isRequired,
};

TimezoneInputForm.defaultProps = {
};


TimezoneInputForm = reduxForm({
  form: 'timezone-input',
  enableReinitialize: true,
})(TimezoneInputForm);

TimezoneInputForm = connect(
  ({ postingSchedule }) => ({
    initialValues: {
      timezone: postingSchedule && !postingSchedule.clearTimezoneInput ? postingSchedule.profileTimezoneCity : '',
    },
  }),
)(TimezoneInputForm);

export default TimezoneInputForm;
