import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '@bufferapp/publish-shared-components';
import { Text } from '@bufferapp/components';
import { Button } from '@bufferapp/ui';
import { ArrowLeft } from '@bufferapp/ui/Icon';
import { gray } from '@bufferapp/ui/style/colors';
import ManageAppsAndExtras from '@bufferapp/manage-apps-extras';
import Notifications from '@bufferapp/publish-account-notifications';
import ProfileSidebarComponent from '@bufferapp/publish-profile-sidebar/components/ProfileSidebar';
import TabsNames from '../../constants';
import Security from '../Security';
import General from '../General';
import { openBillingWindow } from '../../../tabs/utils';

const tabStyle = {
  overflowY: 'auto',
  height: 'calc(100vh - 113px)', // 56px appshell + 57px tabs
};

const containerStyle = {
  maxWidth: '864px',
  paddingTop: '16px',
  margin: '0 auto',
};

const PreferenceContent = ({ tabId, onUnknownTab }) => {
  switch (tabId) {
    case TabsNames.BILLING:
    case TabsNames.GENERAL:
      return <General />;
    case TabsNames.SECURITY:
      return <Security />;
    case TabsNames.APPS_EXTRAS:
      return <ManageAppsAndExtras />;
    case TabsNames.NOTIFICATIONS:
      return <Notifications />;
    default:
      onUnknownTab();
      return <Text>Redirecting...</Text>;
  }
};

PreferenceContent.propTypes = {
  tabId: PropTypes.string.isRequired,
  onUnknownTab: PropTypes.func.isRequired,
};

const Preferences = ({
  selectedTabId,
  onTabClick,
  onBackToDashboardClick,
  onUnknownTab,
  selectedProfileId,
  profiles,
  isOnBusinessTrial,
}) => (
  <div
    style={{
      display: 'flex',
      flexGrow: '1',
    }}
  >
    <div
      style={{
        flexGrow: 1,
        padding: '0 1rem',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <nav id="tabs">
        <Tabs selectedTabId={selectedTabId} onTabClick={onTabClick}>
          <Tab tabId={TabsNames.GENERAL}>General</Tab>
          <Tab tabId={TabsNames.SECURITY}>Security</Tab>
          <Tab tabId={TabsNames.NOTIFICATIONS}>Notifications</Tab>
          <Tab tabId={TabsNames.APPS_EXTRAS}>Apps & Extras</Tab>
          <Tab tabId={TabsNames.BILLING} onClick={() => openBillingWindow()}>
            Billing
          </Tab>
        </Tabs>
      </nav>
      <div style={tabStyle}>
        <div style={containerStyle}>
          <Button
            type="secondary"
            size="small"
            icon={<ArrowLeft color={gray} />}
            label="Back to Dashboard"
            onClick={() =>
              onBackToDashboardClick({
                selectedProfileId,
                profiles,
                isOnBusinessTrial,
              })
            }
          />
          <PreferenceContent
            tabId={selectedTabId}
            onUnknownTab={onUnknownTab}
          />
        </div>
      </div>
    </div>
  </div>
);

Preferences.propTypes = {
  selectedTabId: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
  onBackToDashboardClick: PropTypes.func.isRequired,
  onUnknownTab: PropTypes.func.isRequired,
  selectedProfileId: ProfileSidebarComponent.propTypes.selectedProfileId,
  profiles: ProfileSidebarComponent.propTypes.profiles.isRequired,
  isOnBusinessTrial: PropTypes.bool.isRequired,
};

Preferences.defaultProps = {
  selectedProfileId: undefined,
  profiles: [],
};

export default Preferences;
