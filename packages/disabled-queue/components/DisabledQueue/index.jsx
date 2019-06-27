import React from 'react';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import { Text } from '@bufferapp/ui';
import {
  Tabs,
  Tab,
  QueueButtonGroup,
  PostEmptySlot,
  ComposerInput,
} from '@bufferapp/publish-shared-components';
import ProfileSidebar from '@bufferapp/publish-profile-sidebar/components/ProfileSidebar';
import { getURL } from '@bufferapp/publish-server/formatters/src';

const composerStyle = {
  marginBottom: '1.5rem',
  flexGrow: '1',
};

const topBarContainerStyle = {
  display: 'flex',
};

const tabsStyle = {
  paddingLeft: '0.5rem',
  position: 'relative',
  top: '0',
  backgroundColor: 'white',
  zIndex: 1,
};

const profilePageStyle = {
  display: 'flex',
  flexGrow: 1,
};

const profileSideBarStyle = {
  flexBasis: '16rem',
  width: '16rem',
  minWidth: '16rem',
  position: 'sticky',
  bottom: 0,
  top: 0,
  maxHeight: '100vh',
};

const contentStyle = {
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '0.5rem',
  marginRight: '1rem',
  minHeight: '100%',
};

const tabContentStyle = {
  maxWidth: '864px',
  height: '100%',
  marginTop: '1rem',
};

const listHeaderStyle = {
  margin: '1rem 0 1rem 0.5rem',
  display: 'flex',
  alignItems: 'center',
};

const headerTextDateStyle = {
  fontWeight: 'normal',
  lineHeight: 'normal',
  fontSize: '14px',
  textTransform: 'uppercase',
  color: '#636363',
  marginLeft: '8px',
};

const headerTextStyle = {
  display: 'flex',
  alignItems: 'baseline',
};

const calendarBtns = ['Day', 'Week', 'Month'];

const getCurrentDay = () => moment().format('MMMM D');

const onManageSocialAccountClick = () => {
  window.location = getURL.getManageSocialAccountURL();
};

const goToConnectSocialAccount = () => {
  window.location = getURL.getConnectSocialAccountURL();
};

const DisabledQueue = ({ translations }) => (
  <div style={profilePageStyle}>
    <div style={profileSideBarStyle}>
      <ProfileSidebar
        translations={translations}
        goToConnectSocialAccount={goToConnectSocialAccount}
        onManageSocialAccountClick={onManageSocialAccountClick}
        loading={false}
        hasInstagram={false}
        hasFacebook={false}
        hasTwitter={false}
      />
    </div>
    <div style={contentStyle}>
      <div id="tabs" style={tabsStyle}>
        <Tabs
          selectedTabId={'disabledTab'}
          onTabClick={() => {}}
        >
          <Tab tabId={'disabledTab'}>{translations.queueTab}</Tab>
          <Tab tabId={'disabledTab2'}>{translations.analyticsTab}</Tab>
          <Tab tabId={'disabledTab3'}>{translations.awaitingTab}</Tab>
          <Tab tabId={'disabledTab4'}>{translations.draftsTab}</Tab>
          <Tab tabId={'disabledTab5'}>{translations.settingsTab}</Tab>
        </Tabs>
      </div>
      <div style={tabContentStyle}>
        <div style={topBarContainerStyle}>
          <div style={composerStyle}>
            <ComposerInput
              isDisabled
              placeholder={translations.composerInput}
            />
          </div>
        </div>
        <div style={listHeaderStyle}>
          <div style={headerTextStyle}>
            <Text type="h3">{translations.currentDay}</Text>
            <span style={headerTextDateStyle}>
              <Text>{getCurrentDay()}</Text>
            </span>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <QueueButtonGroup
              buttons={calendarBtns}
              onClick={() => {}}
            />
          </div>
        </div>
        <PostEmptySlot
          time="08:33 am"
          service="noProfile"
          onClick={() => {}}
        />
        <PostEmptySlot
          time="5:33 pm"
          service="noProfile"
          onClick={() => {}}
        />
      </div>
    </div>
  </div>
);

DisabledQueue.propTypes = {
  translations: PropTypes.shape({
    connectButton: PropTypes.string,
    queueTab: PropTypes.string,
    analyticsTab: PropTypes.string,
    awaitingTab: PropTypes.string,
    draftsTab: PropTypes.string,
    settingsTab: PropTypes.string,
    composerInput: PropTypes.string,
    currentDay: PropTypes.string,
  }).isRequired,
};

export default DisabledQueue;
