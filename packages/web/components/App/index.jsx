import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import AppPages from '@bufferapp/publish-app-pages';
import AppShell from '@bufferapp/publish-app-shell';
import Notifications from '@bufferapp/notifications';
import AppModals from '@bufferapp/publish-modals';
import CTABanner from '@bufferapp/publish-cta-banner';
import TemporaryBanner from '@bufferapp/publish-temporary-banner';
import ThirdParty from '@bufferapp/publish-thirdparty';
import LoadingGate from '../LoadingGate';

const ThirdPartyWithRouter = withRouter(ThirdParty);
const AppPagesWithRouter = withRouter(AppPages);

const appStyle = {
  display: 'flex',
  height: '100%',
};

const contentStyle = {
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  width: '100vw',
  background: '#fff',
  height: '100%',
  overflow: 'hidden',
};

// Can't use stateless function for App since then
// the `DragDropContext` doesn't work.
// eslint-disable-next-line
class App extends Component {
  render() {
    return (
      <div style={appStyle} className="notranslate">
        <AppShell
          bannerOptions={{
            text:
              'We have had some troubles with a recent deploy; if your posts are in a failed state, please try reconnecting your channel!',
            actionButton: {
              label: 'Learn more',
              action: () =>
                window.location ===
                'https://support.buffer.com/hc/en-us/articles/360038961173-Reconnecting-a-social-channel-in-Buffer-Publish',
            },
            themeColor: 'orange',
          }}
        >
          <div style={contentStyle}>
            <LoadingGate>
              <CTABanner />
              <TemporaryBanner />
              <AppPagesWithRouter />
            </LoadingGate>
          </div>
        </AppShell>
        <Notifications />
        <AppModals />
        <ThirdPartyWithRouter />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
