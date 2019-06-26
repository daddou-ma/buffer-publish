import React from 'react';
import PropTypes from 'prop-types';

import {
  Tabs,
  Tab,
  QueueButtonGroup,
  PostEmptySlot,
} from '@bufferapp/publish-shared-components';
import ProfileSidebar from '@bufferapp/publish-profile-sidebar';

const composerStyle = {
  marginBottom: '1.5rem',
  flexGrow: '1',
};

const composerInputStyle = {
  alignItems: 'center',
  backgroundColor: '#ffffff',
  border: '1px solid #B8B8B8',
  borderRadius: '4px',
  boxShadow: '0 1px 4px rgba(0,0,0,.16)',
  color: '#999999',
  cursor: 'pointer',
  display: 'flex',
  fontFamily: 'Roboto',
  fontSize: '14px',
  height: '48px',
  outline: 'none',
  paddingLeft: '16px',
  paddingRight: '16px',
  width: '100%',
};

const composerInputIcoCameraStyle = {
  background: 'url("https://s3.amazonaws.com/buffer-publish/images/ico-camera.svg") no-repeat',
  width: '16px',
  height: '16px',
  marginLeft: 'auto',
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
  marginBottom: '1rem',
  marginTop: '1rem',
  marginLeft: '0.5rem',
  display: 'flex',
  alignItems: 'center',
};

const headerTextDayOfWeekStyle = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 'bold',
  lineHeight: 'normal',
  fontSize: '18px',
  color: '#3D3D3D',
};

const headerTextDateStyle = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
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
const twitterPost = {
  time: '08:33 am',
  service: 'twitter',
};

const DisabledQueue = () => (
  <div style={profilePageStyle}>
    <div style={profileSideBarStyle}>
      <ProfileSidebar profileId="5b3a241e1264ba18008b456a" />
    </div>
    <div style={contentStyle}>
      <div id="tabs" style={tabsStyle}>
        <Tabs
          selectedTabId={'disabledTab'}
        >
          <Tab tabId={'disabledTab'}>Queue</Tab>
          <Tab tabId={'disabledTab2'}>Analytics</Tab>
          <Tab tabId={'disabledTab3'}>Awaiting Approval</Tab>
          <Tab tabId={'disabledTab4'}>Drafts</Tab>
          <Tab tabId={'disabledTab5'}>Settings</Tab>
        </Tabs>
      </div>
      <div style={tabContentStyle}>
        <div style={topBarContainerStyle}>
          <div style={composerStyle}>
            <button
              style={composerInputStyle}
              disabled
            >
              What would you like to share?
              <div style={composerInputIcoCameraStyle} />
            </button>
          </div>
        </div>
        <div style={listHeaderStyle}>
          <div style={headerTextStyle}>
            <span style={headerTextDayOfWeekStyle}>Today</span>
            <span style={headerTextDateStyle}>7 March</span>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <QueueButtonGroup
              buttons={calendarBtns}
            />
          </div>
        </div>
        <PostEmptySlot onClick={() => {}} {...twitterPost} />
        <PostEmptySlot onClick={() => {}} {...twitterPost} />
      </div>
    </div>
  </div>
  );


DisabledQueue.propTypes = {
};

DisabledQueue.defaultProps = {

};

export default DisabledQueue;
