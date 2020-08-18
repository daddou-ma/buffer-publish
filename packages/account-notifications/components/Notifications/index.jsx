import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@bufferapp/components';
import { Text } from '@bufferapp/ui';
import { useTranslation } from 'react-i18next';
import Notification from '../Notification';

const Notifications = ({
  onToggleClick,
  collaboration,
  queue,
  newsletter,
  milestones,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <Text type="h2">{t('preferences.notifications.title')}</Text>
      <Text type="p">{t('preferences.notifications.description')}</Text>
      <Divider />
      <Notification
        title={t('preferences.notifications.collaboration')}
        description={t('preferences.notifications.collaborationEmail')}
        onToggleClick={onToggleClick}
        toggleisEnabled={collaboration}
        type="collaboration_notifications"
      />
      <Divider />
      <Notification
        title={t('preferences.notifications.newsletter')}
        description={t('preferences.notifications.newsletterEmail')}
        onToggleClick={onToggleClick}
        toggleisEnabled={queue}
        type="queue_notifications"
      />
      <Divider />
      <Notification
        title={t('preferences.notifications.updateFailures')}
        description={t('preferences.notifications.updateFailuresEmail')}
        onToggleClick={onToggleClick}
        toggleisEnabled={newsletter}
        type="newsletter_notifications"
      />
      <Divider />
      <Notification
        title={t('preferences.notifications.updateSuccesses')}
        description={t('preferences.notifications.updateSuccessesEmail')}
        onToggleClick={onToggleClick}
        toggleisEnabled={milestones}
        type="milestones_notifications"
      />
    </div>
  );
};

Notifications.propTypes = {
  onToggleClick: PropTypes.func.isRequired,
  collaboration: PropTypes.bool.isRequired,
  queue: PropTypes.bool.isRequired,
  newsletter: PropTypes.bool.isRequired,
  milestones: PropTypes.bool.isRequired,
};

export default Notifications;
