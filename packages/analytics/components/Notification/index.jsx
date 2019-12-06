import React from 'react';
import PropTypes from 'prop-types';
import { Card, Link } from '@bufferapp/components';
import { Text } from '@bufferapp/ui';
import WarningIcon from '@bufferapp/ui/Icon/Icons/Warning';

const titleStyle = {
  display: 'flex',
};

const iconStyle = {
  display: 'flex',
  alignItems: 'center',
  paddingRight: '0.5rem',
};

const getNotificationCopy = (service, isInstagramBusiness) => {
  if (service === 'instagram' && !isInstagramBusiness) {
    return (
      <div>
        Please convert your Instagram profile from a personal to Business
        account to get advanced analytics.&nbsp;
        <Link
          href={
            'https://faq.buffer.com/article/959-publish-instagram-set-up#direct-scheduling'
          }
          unstyled
          newTab
        >
          Please check our FAQ here for help on how to do this.
        </Link>
      </div>
    );
  }
  return 'We only support Facebook, Instagram, & Twitter profiles in our analytics right now.';
};

const getTitleCopy = (service, isInstagramBusiness) => {
  if (service === 'instagram' && !isInstagramBusiness) {
    return 'Instagram advanced analytics are only available on Instagram Business profiles';
  }
  return "Sorry we don't support this network in our Analytics";
};

const Notification = ({ isInstagramBusiness, service }) => (
  <Card reducedPadding>
    <div style={titleStyle}>
      <span style={iconStyle}>
        <WarningIcon />
      </span>
      <Text type="h3">{getTitleCopy(service, isInstagramBusiness)}</Text>
    </div>
    <Text type="p">{getNotificationCopy(service, isInstagramBusiness)}</Text>
  </Card>
);

Notification.propTypes = {
  isInstagramBusiness: PropTypes.string.isRequired,
  service: PropTypes.string.isRequired,
};

export default Notification;
