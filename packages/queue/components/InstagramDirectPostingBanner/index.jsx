import React from 'react';
import PropTypes from 'prop-types';
import { Text, Link, CircleInstagramIcon } from '@bufferapp/components';

import { borderRadius, borderWidth } from '@bufferapp/components/style/border';

import {
  curiousBlueUltraLight,
  geyser,
} from '@bufferapp/components/style/color';

const textWrapperStyle = {
  display: 'flex',
  marginLeft: '0.3rem',
};

const linkWrapperStyle = {
  marginLeft: '0.3rem',
};

const bannerWrapper = {
  borderRadius,
  border: `${borderWidth} solid ${geyser}`,
  display: 'flex',
  position: 'relative',
  padding: '0.5rem',
  backgroundColor: `${curiousBlueUltraLight}`,
  alignItems: 'center',
};

const InstagramDirectPostingBanner = ({ onDirectPostingClick }) => (
  <div style={bannerWrapper}>
    <CircleInstagramIcon color={'instagram'} />
    <span style={textWrapperStyle}>
      <Text color={'black'} size={'small'}>
        Buffer can now post directly to Instagram!
        <span style={linkWrapperStyle}>
          <Link unstyled href="#" onClick={onDirectPostingClick}>
            Set up Instagram direct scheduling.
          </Link>
        </span>
      </Text>
    </span>
  </div>
);

InstagramDirectPostingBanner.propTypes = {
  onDirectPostingClick: PropTypes.func.isRequired,
};

export default InstagramDirectPostingBanner;
