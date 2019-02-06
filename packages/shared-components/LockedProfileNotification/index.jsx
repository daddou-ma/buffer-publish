import React from 'react';
import {
  Card,
  Text,
  Button,
  NotificationIcon,
} from '@bufferapp/components';

import PropTypes from 'prop-types';

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

const LockedProfileNotification = ({ onClickUpgradeToPro }) => (
  <Card reducedPadding>
    <div style={titleStyle}>
      <span style={iconStyle}>
        <NotificationIcon />
      </span>
      <Text
        color={'outerSpace'}
        weight={'medium'}
      >
        Whoops, this social account is locked
      </Text>
    </div>
    <div style={contentStyle}>
      <Text size={'mini'}>
        This social account is locked because you’re over your plan limit on the Free Plan.
        On this plan, you can have up to 3 social accounts that you use in total.
      </Text>
    </div>
    <div style={contentStyle}>
      <Text size={'mini'}>
        To unlock your social accounts and manage up to 8 accounts,
        please consider upgrading to our Pro Plan.
      </Text>
    </div>
    <form style={{ paddingTop: '1rem', display: 'flex', justifyContent: 'center' }}>
      <Button
        large
        onClick={(e) => {
          e.preventDefault();
          onClickUpgradeToPro();
        }}
      >
        Upgrade to Pro
      </Button>
    </form>
  </Card>
);

LockedProfileNotification.propTypes = {
  onClickUpgradeToPro: PropTypes.func.isRequired,
};

export default LockedProfileNotification;
