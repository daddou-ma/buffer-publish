import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@bufferapp/components';
import { Text } from '@bufferapp/ui';
import { useTranslation } from 'react-i18next';
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
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <Text type="h2">{t('preferences.notifications.title')}</Text>
      <Text type="p">{t('preferences.notifications.description')}</Text>
      <Divider />
      <Notification
        title={t('preferences.notifications.emptyBuffer')}
        description={t('preferences.notifications.emptyBufferEmail')}
        onToggleClick={onToggleClick}
        toggleisEnabled={bufferEmpty}
        type="bufferEmpty"
      />
      <Divider />
      <Notification
        title={t('preferences.notifications.newsletter')}
        description={t('preferences.notifications.newsletterEmail')}
        onToggleClick={onToggleClick}
        toggleisEnabled={bufferTips}
        type="bufferTips"
      />
      <Divider />
      <Notification
        title={t('preferences.notifications.updateFailures')}
        description={t('preferences.notifications.updateFailuresEmail')}
        onToggleClick={onToggleClick}
        toggleisEnabled={updateFailures}
        type="updateFailures"
      />
      <Divider />
      <Notification
        title={t('preferences.notifications.updateSuccesses')}
        description={t('preferences.notifications.updateSuccessesEmail')}
        onToggleClick={onToggleClick}
        toggleisEnabled={updateSuccesses}
        type="updateSuccesses"
      />
      <Divider />
      <Notification
        title={t('preferences.notifications.weeklyDigests')}
        description={t('preferences.notifications.weeklyDigestsEmail')}
        onToggleClick={onToggleClick}
        toggleisEnabled={weeklyDigests}
        type="weeklyDigests"
      />
      <Divider />
      <Notification
        title={t('preferences.notifications.awaitingApproval')}
        description={t('preferences.notifications.weeklyDigestsEmail')}
        onToggleClick={onToggleClick}
        toggleisEnabled={newContributions}
        type="newContributions"
      />
      <Divider />
      <Notification
        title={t('preferences.notifications.movedBackToDrafts')}
        description={t('preferences.notifications.movedBackToDraftsEmail')}
        onToggleClick={onToggleClick}
        toggleisEnabled={postMovedBackToDrafts}
        type="postMovedBackToDrafts"
      />
      <Divider />
      <Notification
        title={t('preferences.notifications.celebrations')}
        description={t('preferences.notifications.celebrationsEmail')}
        onToggleClick={onToggleClick}
        toggleisEnabled={celebrations}
        type="celebrations"
      />
    </div>
  );
};

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
