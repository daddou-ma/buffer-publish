import React from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
} from '@bufferapp/publish-shared-components';
import { Link, Text } from '@bufferapp/components';

const upgradeCtaStyle = {
  transform: 'translate(0, 1px)',
  margin: '0 42px 0 0',
  display: 'inline-block',
  minWidth: '60px',
  textAlign: 'center',
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
        {isBusinessAccount &&
        <Tab tabId={'analytics'}>Analytics</Tab>
        }
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
        {shouldShowUpgradeCta &&
        <div style={upgradeCtaStyle}>
          <Text size="mini">
            <Link
              padding="18px 13px 17px 13px"
              block
              unstyled
              newTab
              href={'#'}
              onClick={(e) => {
                e.preventDefault();
                showUpgradeModal();
              }}
            >
              Upgrade
            </Link>
          </Text>
        </div>
        }
      </Tabs>
      {shouldShowNestedSettingsTab &&
      <Tabs
        selectedTabId={selectedChildTab}
        onTabClick={onChildTabClick}
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
