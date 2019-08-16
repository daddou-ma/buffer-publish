import React from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
} from '@bufferapp/publish-shared-components';
import { Button } from '@bufferapp/ui';
import { Text } from '@bufferapp/components';
import FeatureLoader, { WithFeatureLoader } from '@bufferapp/product-features';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';
import styled from 'styled-components';
import { getValidTab } from '../../utils';

const UpgradeCtaStyle = styled.div`
  transform: translate(0, 1px);
  margin: 12px 0;
  display: inline-block;
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;
`;

const ButtonWrapper = styled.div`
  margin-left: 8px;
  display: inline-block;
`;

const tabsStyle = {
  paddingLeft: '0.5rem',
  position: 'relative',
  top: '0',
  backgroundColor: 'white',
  zIndex: 1,
};

class TabNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };

    this.isValidTab = this.isValidTab.bind(this);
  }

  isValidTab (tabId) {
    const {
      features,
      isBusinessAccount,
      isManager,
      isInstagramProfile,
    } = this.props;

    return tabId === getValidTab(
      tabId,
      isBusinessAccount,
      isInstagramProfile,
      isManager,
      features.isFreeUser());
  }

  render () {
    const {
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
      canStartProTrial,
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
          {this.isValidTab('pastReminders') &&
            <Tab tabId={'pastReminders'}>Past Reminders</Tab>
          }
          <Tab tabId={'analytics'}>Analytics</Tab>
          {/* Team Members who are Managers */}
          {this.isValidTab('awaitingApproval') &&
            <Tab tabId={'awaitingApproval'}>Awaiting Approval</Tab>
          }
          {/* Team Members who are Contributors */}
          {this.isValidTab('pendingApproval') &&
            <Tab tabId={'pendingApproval'}>Pending Approval</Tab>
          }
          {/* Pro and up users or Team Members */}
          {this.isValidTab('drafts') &&
            <Tab tabId={'drafts'}>Drafts</Tab>
          }
          {/* Business users or Team Members */}
          {this.isValidTab('grid') &&
            <Tab tabId={'grid'}>Shop Grid</Tab>
          }
          <Tab tabId={'settings'}>Settings</Tab>
        </Tabs>
        <UpgradeCtaStyle>
          <ButtonWrapper>
            <Button
              label="Upgrade"
              type="secondary"
              size="small"
              onClick={(e) => {
                e.preventDefault();
                onUpgradeButtonClick();
              }}
            />
          </ButtonWrapper>
        </UpgradeCtaStyle>
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
                  window.location.assign(`${getURL.getManageURL()}`);
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
  canStartProTrial: false,
};

TabNavigation.propTypes = {
  features: PropTypes.any.isRequired, // eslint-disable-line
  isBusinessAccount: PropTypes.bool,
  isManager: PropTypes.bool.isRequired,
  selectedTabId: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
  shouldShowUpgradeCta: PropTypes.bool.isRequired,
  onUpgradeButtonClick: PropTypes.func.isRequired,
  canStartProTrial: PropTypes.bool,
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
