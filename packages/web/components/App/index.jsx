import React, { Component } from 'react';
import { profilePageRoute, preferencePageRoute, childTabRoute } from '@bufferapp/publish-routes';
import { Route, Switch } from 'react-router';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import AppSidebar from '@bufferapp/app-sidebar';
import Notifications from '@bufferapp/notifications';
import ProfilePage from '@bufferapp/profile-page';
import Preferences from '@bufferapp/publish-preferences';
import AppSwitcher from '@bufferapp/publish-app-switcher';
import EnsurePublishBetaUser from '@bufferapp/publish-beta-redirect';
import AppModals from '@bufferapp/publish-modals';
import InitialLoading from '@bufferapp/publish-initial-loading';
import DefaultPage from '@bufferapp/default-page';

const appStyle = {
  display: 'flex',
  height: '100%',
};

const contentStyle = {
  flexGrow: 1,
};

// Can't use stateless function for App since then
// the `DragDropContext` doesn't work.
class App extends Component { // eslint-disable-line
  render() {
    return (
      <div style={appStyle}>
        <AppSidebar activeProduct="publish" />

        <div style={contentStyle}>
          <EnsurePublishBetaUser>
            <Switch>
              <Route
                path={preferencePageRoute}
                component={Preferences}
              />
              <Route
                path={childTabRoute}
                component={ProfilePage}
              />
              <Route
                path={profilePageRoute}
                component={ProfilePage}
              />
              <Route
                path="/new-connection"
                component={DefaultPage}
              />
              <Route
                component={InitialLoading}
              />
            </Switch>
          </EnsurePublishBetaUser>
        </div>

        <Notifications />
        <AppSwitcher />
        <AppModals />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
