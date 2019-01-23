import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '@bufferapp/publish-shared-components';
import { Link, ArrowLeftIcon, Text } from '@bufferapp/components';
import ProfileSidebar from '@bufferapp/publish-profile-sidebar';
import ManageAppsAndExtras from '@bufferapp/manage-apps-extras';
import ProfileSidebarComponent from '@bufferapp/publish-profile-sidebar/components/ProfileSidebar';
import FeatureLoader from '@bufferapp/product-features';
import TabsNames from '../../constants';
import Security from '../Security';
import General from '../General';
import { openBillingWindow } from '../../../tabs/utils';

const PreferenceContent = ({ tabId, onUnknownTab }) => {
  switch (tabId) {
    case TabsNames.BILLING:
    case TabsNames.GENERAL:
      return <General />;
    case TabsNames.SECURITY:
      return <Security />;
    case TabsNames.APPS_EXTRAS:
      return <ManageAppsAndExtras />;
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
      height: '100%',
    }}
  >
    <div
      style={{
        flexBasis: '16rem',
        width: '16rem',
        minWidth: '16rem',
      }}
    >
      <ProfileSidebar />
    </div>
    <div
      style={{
        flexGrow: 1,
        padding: '0 1rem',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div id={'tabs'}>
        <Tabs selectedTabId={selectedTabId} onTabClick={onTabClick}>
          <Tab tabId={TabsNames.GENERAL}>General</Tab>
          <Tab tabId={TabsNames.SECURITY}>Security</Tab>
          <Tab tabId={TabsNames.APPS_EXTRAS}>Apps & Extras</Tab>
          <FeatureLoader supportedFeatures={'b4b_billing'}>
            <Tab tabId={'b4b-billing'} onClick={() => openBillingWindow()}>
              Billing
            </Tab>
          </FeatureLoader>
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
            margin: '1rem 0',
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
      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
        }}
      >
        <PreferenceContent tabId={selectedTabId} onUnknownTab={onUnknownTab} />
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
