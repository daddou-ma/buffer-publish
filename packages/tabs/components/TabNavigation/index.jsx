import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '@bufferapp/publish-shared-components';
import { Button } from '@bufferapp/ui';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
import { getValidTab } from '../../utils';
import TabTag from '../TabTag';

const UpgradeButton = styled(Button)`
  transform: translate(0, 1px);
  margin: 10px;
  display: inline-block;
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;
`;

const tabsStyle = {
  paddingLeft: '0.5rem',
  position: 'relative',
  top: '0',
  backgroundColor: 'white',
  zIndex: 1,
};

const TabCounterTag = ({ labelName }) =>
  labelName != null && <TabTag type="counter" labelName={labelName} />;

class TabNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };

    this.isValidTab = this.isValidTab.bind(this);
  }

  isValidTab(tabId) {
    const {
      hasApprovalFeature,
      hasDraftsFeature,
      showShowDraftsPaywall,
      hasGridFeature,
      hasStoriesFeature,
      isInstagramProfile,
      isManager,
      shouldHideAdvancedAnalytics,
    } = this.props;

    return (
      tabId ===
      getValidTab({
        tabId,
        hasApprovalFeature,
        hasDraftsFeature,
        showShowDraftsPaywall,
        hasGridFeature,
        hasStoriesFeature,
        isInstagramProfile,
        isManager,
        shouldHideAdvancedAnalytics,
      })
    );
  }

  render() {
    const { loading } = this.state;
    const {
      selectedTabId,
      selectedChildTabId,
      onTabClick,
      onChildTabClick,
      shouldShowUpgradeButton,
      shouldShowNestedSettingsTab,
      shouldShowNestedAnalyticsTab,
      shouldHideAdvancedAnalytics,
      onUpgradeButtonClick,
      isLockedProfile,
      isDisconnectedProfile,
      draftsNeedApprovalCount,
      draftsCount,
      canReconnectChannels,
      t,
    } = this.props;

    return (
      /* wrapper div with "tabs" id necessary as a selector
      for a11y focus after selecting profile in sidebar */
      <nav id="tabs" role="navigation" style={tabsStyle}>
        <Tabs selectedTabId={selectedTabId} onTabClick={onTabClick}>
          <Tab tabId="queue">{t('tabs.queue')}</Tab>
          {/* IG, Business users or Team Members */}
          {this.isValidTab('stories') && <Tab tabId="stories">Stories</Tab>}
          {this.isValidTab('pastReminders') && (
            <Tab tabId="pastReminders">{t('tabs.pastReminders')}</Tab>
          )}
          <Tab tabId="analytics">{t('tabs.analytics')}</Tab>
          {/* Team Members who are Managers */}
          {this.isValidTab('awaitingApproval') && (
            <Tab tabId="awaitingApproval">
              {t('tabs.awaitingApproval')}
              <TabCounterTag labelName={draftsNeedApprovalCount} />
            </Tab>
          )}
          {/* Team Members who are Contributors */}
          {this.isValidTab('pendingApproval') && (
            <Tab tabId="pendingApproval">
              {t('tabs.pendingApproval')}
              <TabCounterTag labelName={draftsNeedApprovalCount} />
            </Tab>
          )}
          {/* Pro and up users or Team Members */}
          {this.isValidTab('drafts') && (
            <Tab tabId="drafts">
              {t('tabs.drafts')}
              <TabCounterTag labelName={draftsCount} />
            </Tab>
          )}
          {/* IG, Business users or Team Members */}
          {this.isValidTab('grid') && (
            <Tab tabId="grid">{t('tabs.shopGrid')}</Tab>
          )}
          <Tab tabId="settings">{t('tabs.settings')}</Tab>
        </Tabs>
        {shouldShowUpgradeButton && (
          <UpgradeButton
            label={t('tabs.upgrade')}
            type="secondary"
            size="small"
            onClick={e => {
              e.preventDefault();
              onUpgradeButtonClick();
            }}
          />
        )}
        {shouldShowNestedAnalyticsTab && !isLockedProfile && (
          <Tabs
            selectedTabId={selectedChildTabId || 'posts'}
            onTabClick={onChildTabClick}
            secondary
          >
            <Tab tabId="posts">{t('tabs.posts')}</Tab>
            {!shouldHideAdvancedAnalytics && (
              <Tab tabId="overview">{t('tabs.overview')}</Tab>
            )}
          </Tabs>
        )}
        {shouldShowNestedSettingsTab && !isLockedProfile && (
          <Tabs
            selectedTabId={selectedChildTabId || 'general-settings'}
            onTabClick={onChildTabClick}
            secondary
          >
            <Tab tabId="general-settings">{t('tabs.general')}</Tab>
            <Tab tabId="posting-schedule">{t('tabs.postingSchedule')}</Tab>
            {/* Hidding reconnect  button when profile is disconnected, as we have a banner in settings content for that */}
            {!isDisconnectedProfile && canReconnectChannels && (
              <div style={{ display: 'inline-block' }}>
                <Button
                  type="secondary"
                  size="small"
                  label={loading ? t('tabs.reconnecting') : t('tabs.reconnect')}
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ loading: true });
                    window.location.assign(
                      `${getURL.getManageSocialAccountURL()}`
                    );
                  }}
                />
              </div>
            )}
          </Tabs>
        )}
      </nav>
    );
  }
}

TabNavigation.defaultProps = {
  shouldShowNestedSettingsTab: false,
  shouldShowNestedAnalyticsTab: false,
  shouldHideAdvancedAnalytics: true,
  shouldShowUpgradeButton: false,
  selectedChildTabId: null,
  isLockedProfile: false,
  isDisconnectedProfile: false,
  isInstagramProfile: false,
  isManager: false,
  draftsNeedApprovalCount: null,
  draftsCount: null,
  canReconnectChannels: true,
  hasApprovalFeature: false,
  hasDraftsFeature: false,
  showShowDraftsPaywall: false,
  hasGridFeature: false,
  hasStoriesFeature: false,
};

TabNavigation.propTypes = {
  canReconnectChannels: PropTypes.bool,
  hasApprovalFeature: PropTypes.bool,
  hasDraftsFeature: PropTypes.bool,
  showShowDraftsPaywall: PropTypes.bool,
  hasGridFeature: PropTypes.bool,
  hasStoriesFeature: PropTypes.bool,
  isManager: PropTypes.bool,
  selectedTabId: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  onTabClick: PropTypes.func.isRequired,
  onUpgradeButtonClick: PropTypes.func.isRequired,
  onChildTabClick: PropTypes.func.isRequired,
  selectedChildTabId: PropTypes.string,
  shouldShowNestedSettingsTab: PropTypes.bool,
  shouldShowNestedAnalyticsTab: PropTypes.bool,
  shouldHideAdvancedAnalytics: PropTypes.bool,
  isLockedProfile: PropTypes.bool,
  isDisconnectedProfile: PropTypes.bool,
  isInstagramProfile: PropTypes.bool,
  shouldShowUpgradeButton: PropTypes.bool,
  draftsNeedApprovalCount: PropTypes.number,
  draftsCount: PropTypes.number,
};

export default withTranslation()(TabNavigation);
