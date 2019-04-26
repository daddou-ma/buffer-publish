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
        Please convert your Instagram profile from a personal to Business account to get advanced analytics.&nbsp;
        <Link href={'https://faq.buffer.com/article/959-publish-instagram-set-up#direct-scheduling'} unstyled newTab>
          Please check our FAQ here for help on how to do this.
        </Link>
      </div>
    );
  }
  return (<div>We only support Facebook & Twitter profiles in our analytics right now.</div>);
};

const getTitleCopy = (service, isInstagramBusiness) => {
  if (service === 'instagram' && !isInstagramBusiness) {
    return (<div>Instagram advanced analytics are only available on Instagram Business profiles</div>)
  }
  return (<div>Sorry we don&apos;t support this network in our Analytics</div>)
}

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
        {getTitleCopy(service, isInstagramBusiness)}
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
