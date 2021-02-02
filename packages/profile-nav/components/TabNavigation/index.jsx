import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Nav,
  NavLink,
  NavSubMenu,
  NavTag,
} from '@bufferapp/publish-shared-components';
import { Button } from '@bufferapp/ui';
import {
  profileTabPages,
  profileChildTabPages,
} from '@bufferapp/publish-routes';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const UpgradeButton = styled(Button)`
  transform: translate(0, 1px);
  margin: 10px;
  display: inline-block;
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;
`;

// eslint-disable-next-line react/prop-types
const NavCounterTag = ({ labelName }) =>
  labelName != null && <NavTag type="counter" labelName={labelName} />;

const TabNavigation = ({
  profileNavTabs,
  profileId,
  draftsNeedApprovalCount,
  draftsCount,
  showUpgradeButton,
  onUpgradeButtonClick,
  showNestedAnalyticsTab,
  showNestedSettingsTab,
  showReconnectButton,
  reconnectURL,
}) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  return (
    <Nav>
      {profileNavTabs.includes('queue') && (
        <NavLink to={profileTabPages.getRoute({ profileId, tabId: 'queue' })}>
          {t('tabs.queue')}
        </NavLink>
      )}
      {profileNavTabs.includes('stories') && (
        <NavLink to={profileTabPages.getRoute({ profileId, tabId: 'stories' })}>
          {t('tabs.stories')}
        </NavLink>
      )}
      {profileNavTabs.includes('pastReminders') && (
        <NavLink
          to={profileTabPages.getRoute({ profileId, tabId: 'pastReminders' })}
        >
          {t('tabs.pastReminders')}
        </NavLink>
      )}
      {profileNavTabs.includes('analytics') && (
        <NavLink
          to={profileTabPages.getRoute({ profileId, tabId: 'analytics' })}
          activeOnlyWhenExact={false}
          hasSubMenu
        >
          {t('tabs.analytics')}
        </NavLink>
      )}
      {showNestedAnalyticsTab && (
        <NavSubMenu type="analytics">
          <NavLink
            to={profileTabPages.getRoute({ profileId, tabId: 'analytics' })}
            secondary
          >
            {t('tabs.posts')}
          </NavLink>
          {profileNavTabs.includes('overview') && (
            <NavLink
              to={profileChildTabPages.getRoute({
                profileId,
                tabId: 'analytics',
                childTabId: 'overview',
              })}
              secondary
            >
              {t('tabs.overview')}
            </NavLink>
          )}
        </NavSubMenu>
      )}
      {profileNavTabs.includes('awaitingApproval') && (
        <NavLink
          to={profileTabPages.getRoute({
            profileId,
            tabId: 'awaitingApproval',
          })}
        >
          {t('tabs.awaitingApproval')}
          <NavCounterTag labelName={draftsNeedApprovalCount} />
        </NavLink>
      )}
      {profileNavTabs.includes('pendingApproval') && (
        <NavLink
          to={profileTabPages.getRoute({ profileId, tabId: 'pendingApproval' })}
        >
          {t('tabs.pendingApproval')}
          <NavCounterTag labelName={draftsNeedApprovalCount} />
        </NavLink>
      )}
      {profileNavTabs.includes('drafts') && (
        <NavLink to={profileTabPages.getRoute({ profileId, tabId: 'drafts' })}>
          {t('tabs.drafts')}
          <NavCounterTag labelName={draftsCount} />
        </NavLink>
      )}
      {profileNavTabs.includes('grid') && (
        <NavLink to={profileTabPages.getRoute({ profileId, tabId: 'grid' })}>
          {t('tabs.shopGrid')}
        </NavLink>
      )}
      {profileNavTabs.includes('settings') && (
        <NavLink
          to={profileTabPages.getRoute({ profileId, tabId: 'settings' })}
          hasSubMenu
          activeOnlyWhenExact={false}
        >
          {t('tabs.settings')}
        </NavLink>
      )}
      {showNestedSettingsTab && (
        <NavSubMenu type="settings">
          <NavLink
            to={profileTabPages.getRoute({ profileId, tabId: 'settings' })}
            secondary
          >
            {t('tabs.general')}
          </NavLink>
          <NavLink
            to={profileChildTabPages.getRoute({
              profileId,
              tabId: 'settings',
              childTabId: 'postingSchedule',
            })}
            secondary
          >
            {t('tabs.postingSchedule')}
          </NavLink>
          {showReconnectButton && (
            <div style={{ display: 'inline-block' }}>
              <Button
                type="secondary"
                size="small"
                label={loading ? t('tabs.reconnecting') : t('tabs.reconnect')}
                onClick={e => {
                  e.preventDefault();
                  setLoading(true);
                  window.location.assign(reconnectURL);
                }}
              />
            </div>
          )}
        </NavSubMenu>
      )}
      {showUpgradeButton && (
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
    </Nav>
  );
};

TabNavigation.defaultProps = {
  profileNavTabs: ['queue'],
  draftsNeedApprovalCount: 0,
  draftsCount: 0,
  showUpgradeButton: false,
  showNestedAnalyticsTab: false,
  showNestedSettingsTab: false,
  showReconnectButton: false,
};

TabNavigation.propTypes = {
  profileNavTabs: PropTypes.arrayOf(PropTypes.string),
  profileId: PropTypes.string.isRequired,
  draftsNeedApprovalCount: PropTypes.number,
  draftsCount: PropTypes.number,
  showUpgradeButton: PropTypes.bool,
  onUpgradeButtonClick: PropTypes.func.isRequired,
  showNestedAnalyticsTab: PropTypes.bool,
  showNestedSettingsTab: PropTypes.bool,
  showReconnectButton: PropTypes.bool,
  reconnectURL: PropTypes.string.isRequired,
};

export default TabNavigation;
