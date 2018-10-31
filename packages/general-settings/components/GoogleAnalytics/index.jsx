import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, Toggle, Divider,
  Button,
} from '@bufferapp/components';

const enableGoogleAnalyticsStyle = {
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  marginBottom: '0.5rem',
};

const generalTextWrapperStyle = {
  display: 'flex',
  marginBottom: '0.5rem',
};

const headerTextWrapperStyle = {
  display: 'flex',
  marginBottom: '0.5rem',
  marginTop: '1rem',
};

const toggleTextWrapperStyle = {
  display: 'flex',
  marginBottom: '0.5rem',
  width: '80%',
};

const enableGoogleAnalyticsToggleStyle = {
  marginBottom: '1.5rem',
  marginTop: '1rem',
  textAlign: 'right',
  whiteSpace: 'nowrap',
};


const GoogleAnalytics = ({
  // isEnabled,
  // transition,
  // machineState,
}) => (
  <div>
    <div style={headerTextWrapperStyle}>
      <Text
        color={'black'}
        weight={'medium'}
      >
        Google Analytics Campaign Tracking
      </Text>
    </div>
    <div style={generalTextWrapperStyle}>
      <Text>
        With campaign tracking enabled in Buffer, you will be able to see how much traffic
        you receive from social media posts directly inside your Google Analytics dashboard. You
        can disable this below if you'd like.
      </Text>
    </div>
    <Divider />
    <div style={headerTextWrapperStyle}>
      <Text
        color={'black'}
      >
        Enable Campaign Tracking
      </Text>
    </div>
    <div style={enableGoogleAnalyticsStyle}>
      <div style={toggleTextWrapperStyle}>
        <Text>
          This enables Google Analytics Tracking via UTM parameters added to links you share.
          (This will override any existing UTM parameters)
        </Text>
      </div>
      <div style={enableGoogleAnalyticsToggleStyle}>
        <Toggle
          on={console.log("enabled")}
          onClick={console.log("clicked")}
          disabled={console.log("disabled")}
        />
      </div>
    </div>
    <Button>
      Customize Campaign Tracking
    </Button>
  </div>
);

GoogleAnalytics.propTypes = {
  onSetUpDirectPostingClick: PropTypes.func.isRequired,
};

export default GoogleAnalytics;
