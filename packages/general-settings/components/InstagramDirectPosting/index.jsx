import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Divider,
  Text,
} from '@bufferapp/components';

const instagramDirectPostingStyle = {
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  marginBottom: '0.5rem',
};

const textWrapperStyle = {
  display: 'flex',
  marginBottom: '0.5rem',
};

const textStyle = {
  flex: 1,
};

const setUpDirectPostingStyle = {
  marginBottom: '1.5rem',
  marginTop: '1rem',
  textAlign: 'right',
  whiteSpace: 'nowrap',
  flex: 0.3,
  marginLeft: '1rem',
};


const InstagramDirectPosting = ({
  onDirectPostingClick,
}) => (
  <div>
    <div style={instagramDirectPostingStyle}>
      <div style={textStyle}>
        <div style={textWrapperStyle}>
          <Text color={'black'}>
            Enable Direct Scheduling
          </Text>
        </div>
        <div style={textWrapperStyle}>
          <Text size={'small'}>
            Buffer can now post directly to Instagram, all
            you need to have is an Instagram Business Profile.
          </Text>
        </div>
      </div>
      <div style={setUpDirectPostingStyle}>
        <Button
          fillContainer
          onClick={onDirectPostingClick}
        >
          Set up Direct Scheduling
        </Button>
      </div>
    </div>
    <Divider />
  </div>
);

InstagramDirectPosting.propTypes = {
  onDirectPostingClick: PropTypes.func.isRequired,
};

export default InstagramDirectPosting;
