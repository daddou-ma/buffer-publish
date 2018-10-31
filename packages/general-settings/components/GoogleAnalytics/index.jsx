import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, Toggle, Divider,
  Button, Input,
} from '@bufferapp/components';

const enableGoogleAnalyticsStyle = {
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  marginBottom: '0.5rem',
};

const generalWrapperStyle = {
  display: 'flex',
  marginBottom: '0.5rem',
};

const formWrapperStyle = {
  marginBottom: '0.5rem',
  width: '50%',
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

const switchStyle = {
  marginBottom: '1.5rem',
  marginTop: '1rem',
  textAlign: 'right',
  whiteSpace: 'nowrap',
};

const switchStyleTwo = {
  marginBottom: '1.5rem',
  marginTop: '1rem',
  whiteSpace: 'nowrap',
};

const inputStyle = {
  marginRight: '0.5rem',
}


const GoogleAnalytics = ({
  // isEnabled,
  // transition,
  // machineState,
  showGACustomizationForm,
  onShowGACustomizationFormClick,
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
    <div style={generalWrapperStyle}>
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
      <div style={switchStyle}>
        <Toggle
          on={console.log("enabled")}
          onClick={console.log("clicked")}
          disabled={console.log("disabled")}
        />
      </div>
    </div>
    {showGACustomizationForm &&
      <form style={formWrapperStyle}>
        <div style={inputStyle}>
          <Input
            label={'Campaign Name'}
            placeholder={'buffer'}
          />
        </div>
        <div style={inputStyle}>
          <Input
            label={'Campaign Source'}
            placeholder={'bufferapp.com'}
          />
        </div>
        <div style={inputStyle}>
          <Input
            label={'Campaign Medium'}
            placeholder={'social'}
          />
        </div>
        <div style={switchStyleTwo}>
          <Button>
            Update Tracking
          </Button>
        </div>
      </form>
    }
    {!showGACustomizationForm &&
      <Button
        secondary
        onClick={() => {
          onShowGACustomizationFormClick();
        }}
      >
        Customize Campaign Tracking
      </Button>
    }
  </div>
);

GoogleAnalytics.propTypes = {
  showGACustomizationForm: PropTypes.bool.isRequired,
  onShowGACustomizationFormClick: PropTypes.func.isRequired,
};

export default GoogleAnalytics;
