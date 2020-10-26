import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@bufferapp/components';
import { Button, Text } from '@bufferapp/ui';

const instagramDirectPostingStyle = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
};

const textStyle = {
  flex: 1,
};

const buttonWrapperStyle = {
  marginLeft: '0.5rem',
  flex: '0.3 1 0%',
};

const InstagramDirectPosting = ({ onDirectPostingClick }) => (
  <div>
    <div style={instagramDirectPostingStyle}>
      <div style={textStyle}>
        <Text type="h3">Enable Direct Scheduling</Text>
        <Text type="p">
          Buffer can now post directly to Instagram, all you need to have is an
          Instagram business account.
        </Text>
      </div>
      <div style={buttonWrapperStyle}>
        <Button
          fullWidth
          type="primary"
          label="Set up Direct Scheduling"
          onClick={onDirectPostingClick}
        />
      </div>
    </div>
    <Divider />
  </div>
);

InstagramDirectPosting.propTypes = {
  onDirectPostingClick: PropTypes.func.isRequired,
};

export default InstagramDirectPosting;
