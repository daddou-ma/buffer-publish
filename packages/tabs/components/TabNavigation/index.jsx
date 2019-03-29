import React from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
} from '@bufferapp/publish-shared-components';
import { Button, Text } from '@bufferapp/components';
import FeatureLoader, { WithFeatureLoader } from '@bufferapp/product-features';

const upgradeCtaStyle = {
  transform: 'translate(0, 1px)',
  margin: '12px 16px',
  display: 'inline-block',
  textAlign: 'center',
  position: 'absolute',
  top: 0,
  right: 0,
};

const tabsStyle = {
  paddingLeft: '0.5rem',
  position: 'sticky',
  top: '0',
  backgroundColor: 'white',
  zIndex: 1,
};

const reconnectProfile = () => {
  if (window.location.hostname === 'publish.local.buffer.com') {
    window.location.assign('https://local.buffer.com/manage/');
  } else {
    window.location.assign('https://buffer.com/manage/');
  }
};

class TabNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  render () {
    const {
      features,
      isBusinessAccount,
      isManager,
      selectedTabId,
      selectedChildTabId,
      onTabClick,
      onChildTabClick,
      shouldShowUpgradeCta,
      shouldShowNestedSettingsTab,
      shouldShowNestedAnalyticsTab,
      onUpgradeButtonClick,
      profileId,
      isLockedProfile,
      isInstagramProfile,
      hasLinkInBioFeatureFlip,
    } = this.props;

    return (
      /* wrapper div with "tabs" id necessary as a selector
      for a11y focus after selecting profile in sidebar */
      <div id="tabs" style={tabsStyle}>
        <Tabs
          selectedTabId={selectedTabId}
          onTabClick={onTabClick}
        >
          <Tab tabId={'queue'}>Queue</Tab>
          {isInstagramProfile &&
            <Tab tabId={'pastReminders'}>Past Reminders</Tab>
          }
          <Tab tabId={'analytics'}>Analytics</Tab>
          {/* Team Members who are Managers */}
          {isBusinessAccount && isManager &&
            <Tab tabId={'awaitingApproval'}>Awaiting Approval</Tab>
          }
          {/* Team Members who are Contributors */}
          {isBusinessAccount && !isManager &&
            <Tab tabId={'pendingApproval'}>Pending Approval</Tab>
          }
          {/* Pro and up users or Team Members */}
          {(!features.isFreeUser() || isBusinessAccount) &&
            <Tab tabId={'drafts'}>Drafts</Tab>
          }
          {/* Pro and up users or Team Members */}
          {(!features.isFreeUser() || isBusinessAccount)
            && isInstagramProfile && hasLinkInBioFeatureFlip &&
            <Tab tabId={'grid'}>Grid</Tab>
          }
          <Tab tabId={'settings'}>Settings</Tab>
        </Tabs>
        {shouldShowUpgradeCta &&
          <div style={upgradeCtaStyle}>
            <div style={{ paddingRight: '10px', display: 'inline-block' }}>
              <Text size="mini">
                Want to see more from Buffer?
            </Text>
            </div>
            <Button
              secondary
              onClick={(e) => {
                e.preventDefault();
                onUpgradeButtonClick('pro');
              }}
            >
              Upgrade to Pro
              </Button>
          </div>
        }
        <FeatureLoader supportedPlans={'pro'}>
          <div style={upgradeCtaStyle}>
            <Button
              secondary
              onClick={(e) => {
                e.preventDefault();
                onUpgradeButtonClick('b4b');
              }}
            >
              Learn about Buffer for Business
            </Button>
          </div>
        </FeatureLoader>
        {shouldShowNestedAnalyticsTab && !isLockedProfile &&
          <Tabs
            selectedTabId={selectedChildTabId || 'posts'}
            onTabClick={onChildTabClick}
            secondary
          >
            <Tab tabId={'posts'}>Posts</Tab>
            <Tab tabId={'overview'}>Overview</Tab>
          </Tabs>
        }
        {shouldShowNestedSettingsTab && !isLockedProfile &&
          <Tabs
            selectedTabId={selectedChildTabId || 'general-settings'}
            onTabClick={onChildTabClick}
            secondary
          >
            <Tab tabId={'general-settings'}>General</Tab>
            <Tab tabId={'posting-schedule'}>Posting Schedule</Tab>
            <Button
              secondary
              small
              onClick={(e) => {
                e.preventDefault();
                this.setState({ loading: true });
                reconnectProfile();
              }}
            >
              { this.state.loading ? 'Reconnecting…' : 'Reconnect' }
            </Button>
          </Tabs>
        }
      </div>
    );
  }
}

TabNavigation.defaultProps = {
  shouldShowUpgradeCta: false,
  shouldShowNestedSettingsTab: false,
  shouldShowNestedAnalyticsTab: false,
  selectedChildTabId: null,
  profileId: null,
  isLockedProfile: false,
  isInstagramProfile: false,
  hasLinkInBioFeatureFlip: false,
  isBusinessAccount: false,
  isManager: false,
};

TabNavigation.propTypes = {
  features: PropTypes.any.isRequired, // eslint-disable-line
  isBusinessAccount: PropTypes.bool,
  isManager: PropTypes.bool.isRequired,
  selectedTabId: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
  shouldShowUpgradeCta: PropTypes.bool.isRequired,
  onUpgradeButtonClick: PropTypes.func.isRequired,
  onChildTabClick: PropTypes.func.isRequired,
  selectedChildTabId: PropTypes.string,
  shouldShowNestedSettingsTab: PropTypes.bool,
  shouldShowNestedAnalyticsTab: PropTypes.bool,
  profileId: PropTypes.string,
  isLockedProfile: PropTypes.bool,
  isInstagramProfile: PropTypes.bool,
  hasLinkInBioFeatureFlip: PropTypes.bool,
};

export default WithFeatureLoader(TabNavigation);
