import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Text,
  Link,
  NotificationIcon,
} from '@bufferapp/components';

const titleStyle = {
  display: 'flex',
};

const iconStyle = {
  display: 'flex',
  alignItems: 'center',
  paddingRight: '0.5rem',
};

const contentStyle = {
  marginTop: '0.5rem',
};

const getNotificationCopy = (service, isInstagramBusiness) => {
  if (service === 'instagram' && !isInstagramBusiness) {
    return (
      <div>
        We only support Instagram business profiles in our analytics right now.
        <Link href={'https://faq.buffer.com/article/959-publish-instagram-set-up'} unstyled newTab>
          Learn how to set your profile to business.
        </Link>
      </div>
    );
  }
  return (<div>We only support Facebook & Twitter profiles in our analytics right now.</div>);
};

const Notification = ({ isInstagramBusiness, service }) => (
  <Card reducedPadding>
    <div style={titleStyle}>
      <span style={iconStyle}>
        <NotificationIcon />
      </span>
      <Text
        color={'outerSpace'}
        weight={'medium'}
      >
        Sorry we don&apos;t support this network in our Analytics
      </Text>
    </div>
    <div style={contentStyle}>
      <Text size={'mini'}>
        {getNotificationCopy(service, isInstagramBusiness)}
      </Text>
    </div>
  </Card>
);

Notification.propTypes = {
  isInstagramBusiness: PropTypes.string.isRequired,
  service: PropTypes.string.isRequired,
};

export default Notification;
