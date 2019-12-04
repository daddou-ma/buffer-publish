import React from 'react';
import { WithFeatureLoader } from '@bufferapp/product-features';
import { Card } from '@bufferapp/components';
import { Text, Button } from '@bufferapp/ui';
import WarningIcon from '@bufferapp/ui/Icon/Icons/Warning';

import PropTypes from 'prop-types';

const titleStyle = {
  display: 'flex',
};

const iconStyle = {
  display: 'flex',
  alignItems: 'center',
  paddingRight: '0.5rem',
};

const formStyle = {
  paddingTop: '1rem',
  display: 'flex',
};

/* eslint-disable react/prop-types */
const renderParagraph = ({ type, profileLimit }, paragraph) => {
  let paragraphText;
  const isFirstParagraph = paragraph === 'firstParagraph';

  switch (type) {
    case 'teamMember':
      paragraphText = isFirstParagraph
        ? 'Sorry, it looks like the owner of this social account has downgraded from a higher plan.'
        : 'We’re keeping this account safe and sound until they’re ready to return!';
      break;
    case 'free':
      paragraphText = isFirstParagraph
        ? `This social account is locked because you’re over your plan limit on the Free Plan. On this plan, you can have up to ${profileLimit} social accounts that you use in total.`
        : 'To unlock your social accounts and manage up to 8 accounts, please consider upgrading to our Pro Plan.';
      break;
    case 'pro':
      paragraphText = isFirstParagraph
        ? `This social account is locked because you’re over your plan limit on the Pro Plan. On this plan, you can have up to ${profileLimit} social accounts that you use in total.`
        : 'To unlock your social accounts and manage up to 150 accounts, please consider upgrading to one of our Business Plans.';
      break;
    case 'business':
      paragraphText = isFirstParagraph
        ? `This social account is locked because you’re over your plan limit on your Business Plan. On this plan, you can have up to ${profileLimit} social accounts that you use in total.`
        : 'To unlock your social accounts, please consider upgrading to a higher Plan.';
      break;
    default:
      return;
  }

  return <Text type="p">{paragraphText}</Text>;
};

const renderButton = ({ type, onClickUpgrade }) => {
  let buttonText;

  switch (type) {
    case 'teamMember':
      return;
    case 'free':
      buttonText = 'Upgrade to Pro';
      break;
    case 'pro':
      buttonText = 'Upgrade to Business';
      break;
    case 'business':
      buttonText = 'See our Business Plans';
      break;
    default:
      return;
  }

  return (
    <Button
      type="primary"
      onClick={e => {
        e.preventDefault();
        onClickUpgrade(type);
      }}
      label={buttonText}
    />
  );
};

const selectedLockedType = (isOwner, features) => {
  if (!isOwner) {
    return 'teamMember';
  } else if (features.isFreeUser()) {
    return 'free';
  } else if (features.isProUser()) {
    return 'pro';
  }
  return 'business';
};

/* eslint-enable react/prop-types */

const LockedProfileNotification = ({
  features,
  isOwner,
  onClickUpgrade,
  profileLimit,
}) => {
  const type = selectedLockedType(isOwner, features);

  return (
    <Card reducedPadding>
      <div style={titleStyle}>
        <span style={iconStyle}>
          <WarningIcon />
        </span>
        <Text type="h3">Whoops, this social account is locked</Text>
      </div>
      {renderParagraph({ type, profileLimit }, 'firstParagraph')}
      {renderParagraph({ type }, 'secondParagraph')}
      <form style={formStyle}>{renderButton({ type, onClickUpgrade })}</form>
    </Card>
  );
};

LockedProfileNotification.propTypes = {
  features: PropTypes.object.isRequired, // eslint-disable-line
  onClickUpgrade: PropTypes.func,
  profileLimit: PropTypes.number,
  isOwner: PropTypes.bool.isRequired,
};

export default WithFeatureLoader(LockedProfileNotification);
