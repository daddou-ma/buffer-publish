import React from 'react';
import PropTypes from 'prop-types';

import BDSButton from '../BDSButton';

const cardStyle = {
  background: '#fff',
  border: '1px solid #B8B8B8',
  boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.16)',
  borderRadius: '4px',
};

const upgradeCardStyle = {
  height: '326px',
  maxWidth: '860px',
  display: 'flex',
  alignItems: 'center',
};

const cardBgStyle = {
  circles: {
    background:
      'url(https://s3.amazonaws.com/buffer-publish/images/circles-cta-background.svg) no-repeat right center',
  },
  squares: {
    background:
      'url(https://s3.amazonaws.com/buffer-publish/images/squares-cta-background.svg) no-repeat right center',
  },
};

const innerContentStyle = {
  maxWidth: '400px',
  marginLeft: '48px',
};

const headingStyle = {
  color: '#121E66',
  fontWeight: 'bold',
  fontSize: '24px',
  fontFamily: 'Roboto',
  lineHeight: '34px',
  marginBottom: '16px',
  marginTop: 0,
};

const bodyStyle = {
  color: '#121E66',
  fontWeight: 'normal',
  fontSize: '16px',
  fontFamily: 'Roboto',
  lineHeight: '26px',
  marginBottom: '16px',
};

const combinedCardStyle = { ...cardStyle, ...upgradeCardStyle };

const BusinessTrialOrUpgradeCard = ({
  heading,
  body,
  cta,
  onCtaClick,
  backgroundImage,
}) => (
  <div style={{ ...combinedCardStyle, ...cardBgStyle[backgroundImage] }}>
    <div style={innerContentStyle}>
      <h3 style={headingStyle}>{heading}</h3>
      <p style={bodyStyle}>{body}</p>
      <BDSButton onClick={onCtaClick}>{cta}</BDSButton>
    </div>
  </div>
);

BusinessTrialOrUpgradeCard.propTypes = {
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired,
  onCtaClick: PropTypes.func.isRequired,
  backgroundImage: PropTypes.oneOf(['circles', 'squares']),
};

BusinessTrialOrUpgradeCard.defaultProps = {
  backgroundImage: 'circles',
};

export default BusinessTrialOrUpgradeCard;
