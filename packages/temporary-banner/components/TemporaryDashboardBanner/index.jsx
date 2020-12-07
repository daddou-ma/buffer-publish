import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Banner from '@bufferapp/ui/Banner';

const dashboardBanner = 'temporary-dashboard-banner';

const getContainerStyle = hidden => ({
  display: hidden ? 'none' : 'flex',
});

/* eslint-disable react/prop-types */
const TopBanner = ({
  status,
  content,
  onCloseBanner,
  themeColor = 'orange',
  actionButton,
}) => (
  <div style={getContainerStyle(status)}>
    <Banner
      themeColor={themeColor}
      onCloseBanner={onCloseBanner}
      actionButton={actionButton}
      customHTML={actionButton ? null : { __html: content }}
      text={actionButton ? content : null}
    />
  </div>
);

/* eslint-enable react/prop-types */

const TemporaryDashboardBanner = ({
  enabledApplicationModes,
  displayRemindersBanner,
  usernamesRemindersList,
}) => {
  const [hidden, hideBanner] = useState(false);

  const onCloseBannerClick = () => {
    hideBanner(!hidden);
  };

  const getEnabledApplicationMode = tag =>
    enabledApplicationModes.filter(mode => mode.tag === tag)[0];

  // Displays Temporary Banner With Admin Message.
  if (enabledApplicationModes && getEnabledApplicationMode(dashboardBanner)) {
    const { content } = getEnabledApplicationMode(dashboardBanner);
    return TopBanner({
      status: hidden,
      content,
      onCloseBanner: onCloseBannerClick,
    });
  }

  // Displays Temporary Banner With Reminders Message.
  let remindersBannerMessage = '';
  if (displayRemindersBanner && usernamesRemindersList) {
    remindersBannerMessage = `Check out your queue for Instagram accounts ${usernamesRemindersList} to set up Reminders and complete your post.`;
  }

  if (displayRemindersBanner && usernamesRemindersList) {
    return TopBanner({
      status: hidden,
      content: remindersBannerMessage,
      onCloseBanner: onCloseBannerClick,
    });
  }
  return null;
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
