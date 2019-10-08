import React from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  Text,
} from '@bufferapp/components';
import LockedProfileNotification from '@bufferapp/publish-locked-profile-notification';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';
import PastRemindersPosts from '../PastRemindersPosts';
import PastRemindersStories from '../PastRemindersStories';

const ErrorBoundary = getErrorBoundary(true);

const headerStyle = {
  marginBottom: '1.5rem',
  width: '100%',
};

const titleStyle = {
  marginBottom: '8px',
};

const PastRemindersWrapper = (props) => {
  const {
    header,
    subHeader,
    isLockedProfile,
    viewType,
  } = props;

  if (isLockedProfile) {
    return <LockedProfileNotification />;
  }

  return (
    <ErrorBoundary>
      <div style={headerStyle}>
        <div style={titleStyle}>
          <Text color="black">{header}</Text>
        </div>
        <Text color="shuttleGray" size="mini">{subHeader}</Text>
        <Divider />
      </div>
      {viewType === 'posts' && <PastRemindersPosts {...props} />}
      {viewType === 'stories' && <PastRemindersStories {...props} />}
    </ErrorBoundary>
  );
};

PastRemindersWrapper.propTypes = {
  header: PropTypes.string,
  subHeader: PropTypes.string,
  viewType: PropTypes.string,
  total: PropTypes.number,
  isLockedProfile: PropTypes.bool,
};

PastRemindersWrapper.defaultProps = {
  header: null,
  subHeader: null,
  viewType: 'posts',
  total: 0,
  isLockedProfile: false,
};

export default PastRemindersWrapper;
