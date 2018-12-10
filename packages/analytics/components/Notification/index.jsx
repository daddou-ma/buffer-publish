import React from 'react';
import {
  Card,
  Text,
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

const Notification = () => (
  <Card reducedPadding>
    <div style={titleStyle}>
      <span style={iconStyle}>
        <NotificationIcon />
      </span>
      <Text
        color={'outerSpace'}
        weight={'bold'}
      >
        Sorry we don&apos;t support this network in our Analytics
      </Text>
    </div>
    <div style={contentStyle}>
      <Text size={'mini'}>
        We only support Facebook & Twitter profiles in our analytics right now.
      </Text>
    </div>
  </Card>
);

export default Notification;
