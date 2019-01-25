import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, Toggle, Button, Input, Card, Divider,
} from '@bufferapp/components';
import LinkShortening from "../LinkShortening";

const googleAnalyticsWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
};

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

const rightContainerStyle = {
  flex: 0.3,
};

const saveChangesStyle = {
  whiteSpace: 'nowrap',
  marginTop: '1rem',
};

const switchStyle = {
  ...rightContainerStyle,
  whiteSpace: 'nowrap',
  marginLeft: '1rem',
  textAlign: 'right',
};

const textStyle = {
  flex: 1,
};

const inputStyle = {
  marginTop: '0.5rem',
};

const customizeButtonStyle = {
  marginTop: '0.5rem',
  flexBasis: '170px',
};

const GoogleAnalytics = ({
  googleAnalyticsIsEnabled,
  showGACustomizationForm,
  onShowGACustomizationFormClick,
  onToggleGoogleAnalyticsClick,
  }) => (
    <div style={googleAnalyticsWrapperStyle}>
      <div style={headerTextWrapperStyle}>
        <Text color={'black'}>
          Google Analytics Campaign Tracking
        </Text>
      </div>
      <div style={generalWrapperStyle}>
        <div style={textStyle}>
          <Text size={'small'}>
            With campaign tracking enabled in Buffer, you will be able to see how much traffic
            you receive from social media posts directly inside your Google Analytics dashboard. You
            can disable this below if you&rsquo;d like.
          </Text>
        </div>
        <div style={rightContainerStyle} />
      </div>
      <Divider />
      <div style={enableCampaignWrapperStyle}>
        <div style={textStyle}>
          <div style={headerTextWrapperStyle}>
            <Text color={'black'} weight={'thin'}>
              Enable Campaign Tracking
            </Text>
          </div>
          <div style={enableGoogleAnalyticsStyle}>
            <Text size={'small'}>
              This enables Google Analytics Tracking via UTM parameters added to links you share.
            </Text>
            <div>
              <Text size={'small'}>
                (This will override any existing UTM parameters)
              </Text>
            </div>
          </div>
        </div>
        <div style={switchStyle}>
          <Toggle
            onText={'Enabled'}
            offText={'Disabled'}
            on={googleAnalyticsIsEnabled}
            size={'small'}
            onClick={() => onToggleGoogleAnalyticsClick(!googleAnalyticsIsEnabled)}
          />
        </div>
      </div>
      {showGACustomizationForm && googleAnalyticsIsEnabled &&
        <div>
          <Card noBorder noPadding>
            <form style={formWrapperStyle}>
              <div style={inputStyle}>
                <Text
                  weight={'semiBold'}
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
                  weight={'semiBold'}
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
                  weight={'semiBold'}
                  size={'small'}
                  color={'black'}
                >
                  Campaign Medium
                </Text>
                <Input
                  placeholder={'social'}
                />
              </div>
              <div style={saveChangesStyle}>
                <Button>
                  Update tracking
                </Button>
              </div>
            </form>
          </Card>
        </div>
      }
      {!showGACustomizationForm && googleAnalyticsIsEnabled &&
        <div style={customizeButtonStyle}>
          <Button
            secondary
            onClick={() => {
              onShowGACustomizationFormClick();
            }}
          >
            Customize Campaign Tracking
          </Button>
        </div>
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
