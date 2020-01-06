import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Banner from '@bufferapp/ui/Banner';

const dashboardBanner = 'temporary-dashboard-banner';

const getContainerStyle = hidden => ({
  display: hidden ? 'none' : 'flex',
});

/* eslint-disable react/prop-types */
const TopBanner = ({ status, content, onCloseBanner }) => (
  <div style={getContainerStyle(status)}>
    <Banner
      themeColor="orange"
      customHTML={{ __html: content }}
      onCloseBanner={onCloseBanner}
    />
  </div>
);
/* eslint-enable react/prop-types */

const TemporaryDashboardBanner = ({
  enabledApplicationModes,
  displayRemindersBanner,
  usernamesRemindersList,
  hasRemindersFlip,
}) => {
  const [hidden, hideBanner] = useState(false);

  const onCloseClick = () => {
    hideBanner(!hidden);
  };

  let remindersBannerMessage = '';
  const getEnabledApplicationMode = tag =>
    enabledApplicationModes.filter(mode => mode.tag === tag)[0];

  if (!enabledApplicationModes && !displayRemindersBanner) {
    return null;
  }

  if (displayRemindersBanner && usernamesRemindersList) {
    remindersBannerMessage = `Check out your queue for Instagram accounts ${usernamesRemindersList} to set up Reminders and complete your post.`;
  }

  if (enabledApplicationModes) {
    const temporaryDashboard = getEnabledApplicationMode(dashboardBanner);

    if (!temporaryDashboard) {
      if (
        displayRemindersBanner &&
        usernamesRemindersList &&
        hasRemindersFlip
      ) {
        return TopBanner({
          status: hidden,
          content: remindersBannerMessage,
          onCloseBanner: onCloseClick,
        });
      }
      return null;
    }

    return TopBanner({
      status: hidden,
      content: temporaryDashboard.content,
      onCloseBanner: onCloseClick,
    });
  }

  if (displayRemindersBanner && usernamesRemindersList && hasRemindersFlip) {
    return TopBanner({
      status: hidden,
      content: remindersBannerMessage,
      onCloseBanner: onCloseClick,
    });
  }
};

TemporaryDashboardBanner.propTypes = {
  enabledApplicationModes: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string)
  ),
  displayRemindersBanner: PropTypes.bool,
  usernamesRemindersList: PropTypes.string,
};

TemporaryDashboardBanner.defaultProps = {
  enabledApplicationModes: [],
};

export default TemporaryDashboardBanner;
