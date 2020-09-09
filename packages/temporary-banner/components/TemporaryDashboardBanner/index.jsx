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
  shouldDisplayIGRetirementBanner,
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
  // Displays temporary banner for Retiring IG personal profiles. Should remove in Oct.
  if (shouldDisplayIGRetirementBanner) {
    const actionButton = {
      label: 'Enable Direct Scheduling',
      action: () => {
        window.location.assign(
          'https://support.buffer.com/hc/en-us/articles/360052978413-Deprecating-Instagram-Personal-Profiles'
        );
      },
    };
    return TopBanner({
      status: hidden,
      content:
        'From October 2020, we will no longer be able to support Instagram accounts where Direct Scheduling is not enabled.',
      onCloseBanner: onCloseBannerClick,
      actionButton,
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
  shouldDisplayIGRetirementBanner: PropTypes.bool,
  usernamesRemindersList: PropTypes.string,
};

TemporaryDashboardBanner.defaultProps = {
  enabledApplicationModes: [],
  shouldDisplayIGRetirementBanner: false,
};

export default TemporaryDashboardBanner;
