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

const Notifications = ({
  onToggleClick,
  bufferEmptyEnabled,
  bufferTipsEnabled,
  updateFailuresEnabled,
  updateSuccessesEnabled,
  weeklyDigestsEnabled,
  newContributionsEnabled,
  postMovedDraftsEnabled,
  celebrationsEnabled,
}) => (
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
      title={'Empty Buffer'}
      description={'Send me an email when one of my Buffers becomes empty.'}
      onToggleClick={onToggleClick}
      toggleisEnabled={bufferEmptyEnabled}
      type={'bufferEmpty'}
    />
    <Divider />
    <Notification
      title={'Newsletter'}
      description={'Send me occasional emails with new Buffer features and tips.'}
      onToggleClick={onToggleClick}
      toggleisEnabled={bufferTipsEnabled}
      type={'bufferTips'}
    />
    <Divider />
    <Notification
      title={'Update Failures'}
      description={'Send me emails when an update fails to post.'}
      onToggleClick={onToggleClick}
      toggleisEnabled={updateFailuresEnabled}
      type={'updateFailures'}
    />
    <Divider />
    <Notification
      title={'Update Successes'}
      description={'Send me emails when an update successfully posts.'}
      onToggleClick={onToggleClick}
      toggleisEnabled={updateSuccessesEnabled}
      type={'updateSuccesses'}
    />
    <Divider />
    <Notification
      title={'Weekly Digests'}
      description={'Send me weekly emails summarizing my posting activity.'}
      onToggleClick={onToggleClick}
      toggleisEnabled={weeklyDigestsEnabled}
      type={'weeklyDigests'}
    />
    <Divider />
    <Notification
      title={'Awaiting Approval'}
      description={'Send me emails when there is a new draft awaiting approval.'}
      onToggleClick={onToggleClick}
      toggleisEnabled={newContributionsEnabled}
      type={'newContributions'}
    />
    <Divider />
    <Notification
      title={'Post moved back to drafts'}
      description={'Send me emails when my draft is moved from Pending Approval back to Drafts.'}
      onToggleClick={onToggleClick}
      toggleisEnabled={postMovedDraftsEnabled}
      type={'postMovedBackToDrafts'}
    />
    <Divider />
    <Notification
      title={'Celebrations'}
      description={'Send me emails celebrating my posting achievements.'}
      onToggleClick={onToggleClick}
      toggleisEnabled={celebrationsEnabled}
      type={'celebrations'}
    />
  </div>
);

Notifications.propTypes = {
  onToggleClick: PropTypes.func.isRequired,
  bufferEmptyEnabled: PropTypes.bool.isRequired,
  bufferTipsEnabled: PropTypes.bool.isRequired,
  updateFailuresEnabled: PropTypes.bool.isRequired,
  updateSuccessesEnabled: PropTypes.bool.isRequired,
  weeklyDigestsEnabled: PropTypes.bool.isRequired,
  newContributionsEnabled: PropTypes.bool.isRequired,
  postMovedDraftsEnabled: PropTypes.bool.isRequired,
  celebrationsEnabled: PropTypes.bool.isRequired,
};

export default Notifications;
