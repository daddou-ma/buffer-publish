import React from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
} from '@bufferapp/publish-shared-components';
import { Button, Text } from '@bufferapp/components';

const upgradeCtaStyle = {
  transform: 'translate(0, 1px)',
  margin: '12px 16px',
  display: 'inline-block',
  textAlign: 'center',
  position: 'absolute',
  top: 0,
  right: 0,
};

const TabNavigation = ({
  isBusinessAccount,
  isManager,
  selectedTabId,
  selectedChildTabId,
  onTabClick,
  onChildTabClick,
  shouldShowUpgradeCta,
  shouldShowNestedSettingsTab,
  showUpgradeModal,
  hasDraftsFeatureFlip,
}) => {
  const selectedChildTab = selectedChildTabId || 'general-settings';
  return (
    /* wrapper div with "tabs" id necessary as a selector
    for a11y focus after selecting profile in sidebar */
    <div id="tabs" style={{ paddingLeft: '0.5rem' }}>
      <Tabs
        selectedTabId={selectedTabId}
        onTabClick={onTabClick}
      >
        <Tab tabId={'queue'}>Queue</Tab>
        <Tab tabId={'sent'}>Sent Posts</Tab>
        {hasDraftsFeatureFlip && isBusinessAccount && isManager &&
          <Tab tabId={'awaitingApproval'}>Awaiting Approval</Tab>
        }
        {hasDraftsFeatureFlip && isBusinessAccount && !isManager &&
          <Tab tabId={'pendingApproval'}>Pending Approval</Tab>
        }
        {hasDraftsFeatureFlip && isBusinessAccount &&
          <Tab tabId={'drafts'}>Drafts</Tab>
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
              showUpgradeModal();
            }}
          >
            Upgrade to Pro
            </Button>
        </div>
      }
      {shouldShowNestedSettingsTab &&
        <Tabs
          selectedTabId={selectedChildTab}
          onTabClick={onChildTabClick}
          secondary
        >
          <Tab tabId={'general-settings'}>General</Tab>
          <Tab tabId={'posting-schedule'}>Posting Schedule</Tab>
        </Tabs>
      }
    </div>
  );
};

TabNavigation.defaultProps = {
  shouldShowUpgradeCta: false,
  hasDraftsFeatureFlip: false,
  shouldShowNestedSettingsTab: false,
  selectedChildTabId: null,
};

TabNavigation.propTypes = {
  isBusinessAccount: PropTypes.bool.isRequired,
  isManager: PropTypes.bool.isRequired,
  selectedTabId: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
  shouldShowUpgradeCta: PropTypes.bool.isRequired,
  showUpgradeModal: PropTypes.func.isRequired,
  hasDraftsFeatureFlip: PropTypes.bool,
  onChildTabClick: PropTypes.func.isRequired,
  selectedChildTabId: PropTypes.string,
  shouldShowNestedSettingsTab: PropTypes.bool,
};

export default TabNavigation;
