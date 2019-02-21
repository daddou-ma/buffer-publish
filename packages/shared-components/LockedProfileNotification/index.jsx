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

const formStyle = {
  paddingTop: '1rem',
  display: 'flex',
  justifyContent: 'center',
};

const renderParagraph = ({ plan }, paragraph) => {
  let paragraphText;

  if (plan === 'free') {
    if (paragraph === 'firstParagraph') {
      paragraphText = 'This social account is locked because you’re over your plan limit on the Free Plan. On this plan, you can have up to 3 social accounts that you use in total.';
    } else if (paragraph === 'secondParagraph') {
      paragraphText = 'To unlock your social accounts and manage up to 8 accounts, please consider upgrading to our Pro Plan.';
    }
  } else if (plan === 'pro') {
    if (paragraph === 'firstParagraph') {
      paragraphText = 'This social account is locked because you’re over your plan limit on the Pro Plan. On this plan, you can have up to 8 social accounts that you use in total.';
    } else if (paragraph === 'secondParagraph') {
      paragraphText = 'To unlock your social accounts and manage up to 150 accounts, please consider upgrading to one of our Business Plans.';
    }
  }
  return (
    <Text size={'mini'}>
      {paragraphText}
    </Text>
  );
};

const renderButton = ({ plan, onClickUpgrade }) => {
  let buttonText;

  if (plan === 'free') {
    buttonText = 'Upgrade to Pro';
  } else if (plan === 'pro') {
    buttonText = 'Upgrade to Business';
  }
  return (
    <Button
      large
      onClick={(e) => {
        e.preventDefault();
        onClickUpgrade(plan);
      }}
    >
      {buttonText}
    </Button>
  );
};

const LockedProfileNotification = ({ onClickUpgrade, plan }) => (
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
      {renderParagraph({ plan }, 'firstParagraph')}
    </div>
    <div style={contentStyle}>
      { renderParagraph({ plan }, 'secondParagraph') }
    </div>
    <form style={formStyle}>
      { renderButton({ plan, onClickUpgrade }) }
    </form>
  </Card>
);

LockedProfileNotification.propTypes = {
  onClickUpgrade: PropTypes.func.isRequired,
  plan: PropTypes.oneOf(['free', 'pro']).isRequired,
};

export default LockedProfileNotification;
