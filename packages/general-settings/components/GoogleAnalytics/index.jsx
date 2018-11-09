import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, Toggle, Divider,
  Button, Input, Card,
} from '@bufferapp/components';

const enableGoogleAnalyticsStyle = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
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
  marginBottom: '1rem',
  marginTop: '1rem',
};

const switchStyle = {
  marginBottom: '1.5rem',
  marginTop: '1rem',
  whiteSpace: 'nowrap',
};

const inputStyle = {
  marginTop: '0.5rem',
};

const GoogleAnalytics = ({
  googleAnalyticsIsEnabled,
  showGACustomizationForm,
  onShowGACustomizationFormClick,
  onToggleGoogleAnalyticsClick,
  }) => (
  <Card>
    <div style={headerTextWrapperStyle}>
      <Text
        color={'black'}
        weight={'medium'}
      >
        Google Analytics Campaign Tracking
      </Text>
    </div>
    <div style={generalWrapperStyle}>
      <Text
        size={'small'}
      >
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
      <Text
        size={'small'}
      >
        This enables Google Analytics Tracking via UTM parameters added to links you share.
      </Text>
      <Text
        size={'small'}
        weight={'bold'}
      >
        (This will override any existing UTM parameters)
      </Text>
      <div style={switchStyle}>
        <Toggle
          onText={'Campaign tracking:'}
          offText={'Campaign tracking:'}
          on={googleAnalyticsIsEnabled}
          onClick={() => { onToggleGoogleAnalyticsClick(!googleAnalyticsIsEnabled); }}
        />
      </div>
    </div>
    {showGACustomizationForm &&
      <div>
        <Divider />
        <div style={headerTextWrapperStyle}>
          <Text
            color={'black'}
          >
            Customise Campaign Tracking
          </Text>
        </div>
        <form style={formWrapperStyle}>
          <div style={inputStyle}>
            <Text
              weight={'medium'}
              color={'black'}
            >
              Campaign Name
            </Text>
            <Input
              placeholder={'buffer'}
            />
          </div>
          <div style={inputStyle}>
            <Text
              weight={'medium'}
              color={'black'}
            >
              Campaign Source
            </Text>
            <Input
              placeholder={'bufferapp.com'}
            />
          </div>
          <div style={inputStyle}>
            <Text
              weight={'medium'}
              color={'black'}
            >
              Campaign Medium
            </Text>
            <Input
              placeholder={'social'}
            />
          </div>
          <div style={switchStyle}>
            <Button>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    }
    {!showGACustomizationForm && googleAnalyticsIsEnabled &&
      <Button
        secondary
        onClick={() => {
          onShowGACustomizationFormClick();
        }}
      >
        Customize Campaign Tracking
      </Button>
    }
  </Card>
);

GoogleAnalytics.propTypes = {
  showGACustomizationForm: PropTypes.bool.isRequired,
  onShowGACustomizationFormClick: PropTypes.func.isRequired,
  googleAnalyticsIsEnabled: PropTypes.bool.isRequired,
  onToggleGoogleAnalyticsClick: PropTypes.func.isRequired,
};

export default GoogleAnalytics;
