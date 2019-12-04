import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@bufferapp/components';
import { Text } from '@bufferapp/ui';
import Notification from '../Notification';

const Notifications = ({
  onToggleClick,
  bufferEmpty,
  bufferTips,
  updateFailures,
  updateSuccesses,
  weeklyDigests,
  newContributions,
  postMovedBackToDrafts,
  celebrations,
}) => (
  <div>
    <Text type="h2">Email Notifications</Text>
    <Text type="p">
      We can remind you when one of your Buffer is looking a little empty.
    </Text>
    <Divider />
    <Notification
      title={'Empty Buffer'}
      description={'Send me an email when one of my Buffers becomes empty.'}
      onToggleClick={onToggleClick}
      toggleisEnabled={bufferEmpty}
      type={'bufferEmpty'}
    />
    <Divider />
    <Notification
      title={'Newsletter'}
      description={
        'Send me occasional emails with new Buffer features and tips.'
      }
      onToggleClick={onToggleClick}
      toggleisEnabled={bufferTips}
      type={'bufferTips'}
    />
    <Divider />
    <Notification
      title={'Update Failures'}
      description={'Send me emails when an update fails to post.'}
      onToggleClick={onToggleClick}
      toggleisEnabled={updateFailures}
      type={'updateFailures'}
    />
    <Divider />
    <Notification
      title={'Update Successes'}
      description={'Send me emails when an update successfully posts.'}
      onToggleClick={onToggleClick}
      toggleisEnabled={updateSuccesses}
      type={'updateSuccesses'}
    />
    <Divider />
    <Notification
      title={'Weekly Digests'}
      description={'Send me weekly emails summarizing my posting activity.'}
      onToggleClick={onToggleClick}
      toggleisEnabled={weeklyDigests}
      type={'weeklyDigests'}
    />
    <Divider />
    <Notification
      title={'Awaiting Approval'}
      description={
        'Send me emails when there is a new draft awaiting approval.'
      }
      onToggleClick={onToggleClick}
      toggleisEnabled={newContributions}
      type={'newContributions'}
    />
    <Divider />
    <Notification
      title={'Post moved back to drafts'}
      description={
        'Send me emails when my draft is moved from Pending Approval back to Drafts.'
      }
      onToggleClick={onToggleClick}
      toggleisEnabled={postMovedBackToDrafts}
      type={'postMovedBackToDrafts'}
    />
    <Divider />
    <Notification
      title={'Celebrations'}
      description={'Send me emails celebrating my posting achievements.'}
      onToggleClick={onToggleClick}
      toggleisEnabled={celebrations}
      type={'celebrations'}
    />
  </div>
);

Notifications.propTypes = {
  onToggleClick: PropTypes.func.isRequired,
  bufferEmpty: PropTypes.bool.isRequired,
  bufferTips: PropTypes.bool.isRequired,
  updateFailures: PropTypes.bool.isRequired,
  updateSuccesses: PropTypes.bool.isRequired,
  weeklyDigests: PropTypes.bool.isRequired,
  newContributions: PropTypes.bool.isRequired,
  postMovedBackToDrafts: PropTypes.bool.isRequired,
  celebrations: PropTypes.bool.isRequired,
};

export default Notifications;
