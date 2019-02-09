import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Divider,
} from '@bufferapp/components';
import Notification from '../Notification';

const styleBlockRow = {
  display: 'block',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginRight: '1rem',
  paddingTop: '1rem',
};

const textStyle = {
  marginTop: '0.5rem',
};

const Notifications = ({ onToggleClick, toggleisEnabled }) => (
  <div>
    <div style={styleBlockRow}>
      <div>
        <Text color={'black'}>Email Notifications</Text>
        <div style={textStyle}>
          <Text size={'mini'} color={'shuttleGray'}>
            We can remind you when one of your Buffer is looking a little empty.
          </Text>
        </div>
      </div>
      <Divider />
    </div>
    <Notification
      title={'Update Failures'}
      description={'Send me emails when an update fails to post.'}
      onToggleClick={onToggleClick}
      toggleisEnabled={toggleisEnabled}
    />
    <Divider />
    <Notification
      title={'Awaiting Approval'}
      description={'Send me emails when there is a new draft awaiting approval.'}
      onToggleClick={onToggleClick}
      toggleisEnabled={toggleisEnabled}
    />
    <Divider />
    <Notification
      title={'Post moved back to drafts'}
      description={'Send me emails when my draft is moved from Pending Approval back to Drafts.'}
      onToggleClick={onToggleClick}
      toggleisEnabled={toggleisEnabled}
    />
  </div>
);

Notifications.propTypes = {
  onToggleClick: PropTypes.func.isRequired,
  toggleisEnabled: PropTypes.bool.isRequired,
};

export default Notifications;
