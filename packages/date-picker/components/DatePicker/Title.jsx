import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Text from '@bufferapp/components/Text';

const formatDate = (date, dateFormat = 'MM/DD/YY') =>
  moment.unix(date).format(dateFormat);

const Title = ({ presets, loading, startDate, endDate }) => {
  let title;
  if (!loading) {
    const selectedRange = presets.find(preset => preset.selected);
    if (selectedRange.label === 'Custom' && startDate && endDate) {
      const from = formatDate(startDate);
      const to = formatDate(endDate);
      title = `From: ${from} - To: ${to}`;
    } else {
      title = selectedRange.label;
    }
  } else {
    title = 'Loading...';
  }
  return (<Text color="outerSpace" size="extra-small" weight="medium">{title}</Text>);
};

Title.defaultProps = {
  loading: false,
  startDate: 0,
  endDate: 0,
};

Title.propTypes = {
  startDate: PropTypes.number,
  endDate: PropTypes.number,
  loading: PropTypes.bool,
};

export default Title;
