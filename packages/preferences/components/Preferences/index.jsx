import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '@bufferapp/publish-shared-components';
import { Link, ArrowLeftIcon, Text } from '@bufferapp/components';
import ManageAppsAndExtras from '@bufferapp/manage-apps-extras';
import Notifications from '@bufferapp/publish-account-notifications';
import ProfileSidebarComponent from '@bufferapp/publish-profile-sidebar/components/ProfileSidebar';
import TabsNames from '../../constants';
import Security from '../Security';
import General from '../General';
import { openBillingWindow } from '../../../tabs/utils';

const tabStyle = {
  overflowY: 'auto',
};

const containerStyle = {
  maxWidth: '864px',
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
      <div id={'tabs'}>
        <Tabs selectedTabId={selectedTabId} onTabClick={onTabClick}>
          <Tab tabId={TabsNames.GENERAL}>General</Tab>
          <Tab tabId={TabsNames.SECURITY}>Security</Tab>
          <Tab tabId={TabsNames.NOTIFICATIONS}>Notifications</Tab>
          <Tab tabId={TabsNames.APPS_EXTRAS}>Apps & Extras</Tab>
          <Tab tabId={TabsNames.BILLING} onClick={() => openBillingWindow()}>
            Billing
          </Tab>
        </Tabs>
      </div>
      <Link
        href={'#'}
        onClick={(e) => {
          e.preventDefault();
          onBackToDashboardClick({
            selectedProfileId,
            profiles,
          });
        }}
        unstyled
      >
        <div
          style={{
            display: 'flex',
            margin: '1rem 0 1rem -3px',
            alignItems: 'center',
          }}
        >
          <ArrowLeftIcon
            size={{
              width: '0.9rem',
              height: '0.9rem',
            }}
          />
          <div style={{ marginLeft: '0.5rem' }}>
            <Text size={'mini'} color={'curiousBlue'}>
              Back To Dashboard
            </Text>
          </div>
        </div>
      </Link>
      <div style={tabStyle}>
        <div style={containerStyle}>
          <PreferenceContent tabId={selectedTabId} onUnknownTab={onUnknownTab} />
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
};

Preferences.defaultProps = {
  selectedProfileId: undefined,
  profiles: [],
};

export default Preferences;
