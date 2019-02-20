import React from 'react';
import PropTypes from 'prop-types';
import BDSButton from '../BDSButton';

const svgUrl = 'https://s3.amazonaws.com/buffer-publish/images/analytics-cta-banner-background.svg';

const bannerStyle = {
  top: '155px',
  height: '105px',
  background: `url(${svgUrl}) no-repeat`,
  display: 'flex',
  alignItems: 'center',
  marginLeft: '-5px',
  marginRight: '-5px',
  marginBottom: '15px',
};

const bodyStyle = {
  paddingLeft: '45px',
  fontFamily: 'Roboto',
  fontSize: '16px',
  fontWeight: '500',
};

const btnWrapperStyle = {
  marginLeft: 'auto',
  paddingRight: '45px',
};

const subtextStyle = {
  fontFamily: 'Roboto',
  fontWeight: 'bold',
  lineHeight: '20px',
  fontSize: '10px',
  color: '#636363',
  position: 'relative',
  float: 'right',
  top: '-42px',
  left: '-97px',
};

const BusinessTrialOrUpgradeBanner = ({ body, cta, subtext, onCtaClick }) => (
  <div>
    <div style={bannerStyle}>
      <div style={bodyStyle}>
        {body}
      </div>
      <div style={btnWrapperStyle}>
        <BDSButton onClick={onCtaClick}>{cta}</BDSButton>
      </div>
    </div>
    {subtext && <div style={subtextStyle}>{subtext}</div>}
  </div>
);

BusinessTrialOrUpgradeBanner.propTypes = {
  body: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired,
  subtext: PropTypes.string,
  onCtaClick: PropTypes.func.isRequired,
};

BusinessTrialOrUpgradeBanner.defaultProps = {
  subtext: null,
};

export default BusinessTrialOrUpgradeBanner;
