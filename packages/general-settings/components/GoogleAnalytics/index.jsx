import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, Toggle, Button, Input, Card,
} from '@bufferapp/components';

const enableGoogleAnalyticsStyle = {
  marginBottom: '0.5rem',
};

const generalWrapperStyle = {
  display: 'flex',
  marginBottom: '0.5rem',
};

const enableCampaignWrapperStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: '1 1 0%',
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
  margin: '1.5rem 0 1rem 1.5rem',
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
    <div>
      <div style={headerTextWrapperStyle}>
        <Text
          color={'black'}
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
          can disable this below if you&rsquo;d like.
        </Text>
      </div>
      <div style={enableCampaignWrapperStyle}>
        <div>
          <div style={headerTextWrapperStyle}>
            <Text
              color={'black'}
              weight={'thin'}
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
              &nbsp;(This will override any existing UTM parameters)
            </Text>
          </div>
        </div>
        <div style={switchStyle}>
          <Toggle
            onText={'Campaign tracking:'}
            offText={'Campaign tracking:'}
            on={googleAnalyticsIsEnabled}
            size={'small'}
            onClick={() => onToggleGoogleAnalyticsClick(!googleAnalyticsIsEnabled)}
          />
        </div>
      </div>
      {showGACustomizationForm && googleAnalyticsIsEnabled &&
        <div>
          <Card>
            <div style={headerTextWrapperStyle}>
              <Text
                color={'black'}
                size={'mini'}
                weight={'thin'}
              >
                Customise Campaign Tracking
              </Text>
            </div>
            <form style={formWrapperStyle}>
              <div style={inputStyle}>
                <Text
                  weight={'thin'}
                  size={'small'}
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
                  weight={'thin'}
                  size={'small'}
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
                  weight={'thin'}
                  size={'small'}
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
          </Card>
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
    </div>
);

GoogleAnalytics.propTypes = {
  showGACustomizationForm: PropTypes.bool.isRequired,
  onShowGACustomizationFormClick: PropTypes.func.isRequired,
  googleAnalyticsIsEnabled: PropTypes.bool.isRequired,
  onToggleGoogleAnalyticsClick: PropTypes.func.isRequired,
};

export default GoogleAnalytics;
