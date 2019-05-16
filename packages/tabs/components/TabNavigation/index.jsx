import React from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
} from '@bufferapp/publish-shared-components';
import { Button } from '@bufferapp/ui';
import { Text } from '@bufferapp/components';
import FeatureLoader, { WithFeatureLoader } from '@bufferapp/product-features';

const upgradeCtaStyle = {
  transform: 'translate(0, 1px)',
  margin: '12px 0',
  display: 'inline-block',
  textAlign: 'center',
  position: 'absolute',
  top: 0,
  right: 0,
};

const tabsStyle = {
  paddingLeft: '0.5rem',
  position: 'relative',
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
      onProTrial,
      shouldShowUpgradeCta,
      shouldShowNestedSettingsTab,
      shouldShowNestedAnalyticsTab,
      shouldHideAnalyticsOverviewTab,
      onUpgradeButtonClick,
      isLockedProfile,
      isInstagramProfile,
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
          {/* Business users or Team Members */}
          {isBusinessAccount && isInstagramProfile &&
            <Tab tabId={'grid'}>Shop Grid</Tab>
          }
          <Tab tabId={'settings'}>Settings</Tab>
        </Tabs>
        {shouldShowUpgradeCta &&
          <div style={upgradeCtaStyle}>
            <Text size="mini">
              Want to see more from Buffer?
            </Text>
            <div style={{ marginLeft: '8px', display: 'inline-block' }}>
              <Button
                label="Upgrade to Pro"
                type="secondary"
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  onUpgradeButtonClick('pro');
                }}
              />
            </div>
          </div>
        }
        {!onProTrial &&
          <FeatureLoader supportedPlans={'pro'}>
            <div style={upgradeCtaStyle}>
              <Button
                label="Learn about Buffer for Business"
                size="small"
                type="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  onUpgradeButtonClick('b4b');
                }}
              />
            </div>
          </FeatureLoader>
        }
        {shouldShowNestedAnalyticsTab && !isLockedProfile &&
          <Tabs
            selectedTabId={selectedChildTabId || 'posts'}
            onTabClick={onChildTabClick}
            secondary
          >
            <Tab tabId={'posts'}>Posts</Tab>
            {!shouldHideAnalyticsOverviewTab &&
              <Tab tabId={'overview'}>Overview</Tab>
            }
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
            <div style={{ display: 'inline-block' }}>
              <Button
                type="secondary"
                size="small"
                label={this.state.loading ? 'Reconnecting…' : 'Reconnect'}
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ loading: true });
                  reconnectProfile();
                }}
              />
            </div>
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
  shouldHideAnalyticsOverviewTab: false,
  selectedChildTabId: null,
  profileId: null,
  isLockedProfile: false,
  isInstagramProfile: false,
  isBusinessAccount: false,
  isManager: false,
  onProTrial: true,
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
  onProTrial: PropTypes.bool,
  selectedChildTabId: PropTypes.string,
  shouldShowNestedSettingsTab: PropTypes.bool,
  shouldShowNestedAnalyticsTab: PropTypes.bool,
  shouldHideAnalyticsOverviewTab: PropTypes.bool,
  profileId: PropTypes.string,
  isLockedProfile: PropTypes.bool,
  isInstagramProfile: PropTypes.bool,
};

export default WithFeatureLoader(TabNavigation);
