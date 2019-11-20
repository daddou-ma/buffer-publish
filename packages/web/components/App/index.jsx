import React, { Component } from 'react';
import {
  profilePageRoute,
  preferencePageRoute,
  childTabRoute,
  plansPageRoute,
  newBusinessTrialistsRoute,
  newConnectionRoute,
} from '@bufferapp/publish-routes';
import { Route, Switch, withRouter } from 'react-router';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import AppShell from '@bufferapp/publish-app-shell';
import Notifications from '@bufferapp/notifications';
import ProfilePage from '@bufferapp/profile-page';
import Preferences from '@bufferapp/publish-preferences';
import Plans from '@bufferapp/publish-plans';
import AppSwitcher from '@bufferapp/publish-app-switcher';
import InitialLoading from '@bufferapp/publish-initial-loading';
import AppModals from '@bufferapp/publish-modals';
import DefaultPage from '@bufferapp/default-page';
import OnboardingManager from '@bufferapp/publish-onboarding';
import CTABanner from '@bufferapp/publish-cta-banner';
import TemporaryBanner from '@bufferapp/publish-temporary-banner';
import ThirdParty from '@bufferapp/publish-thirdparty';

const ThirdPartyWithRouter = withRouter(ThirdParty);

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
};

// Can't use stateless function for App since then
// the `DragDropContext` doesn't work.
class App extends Component { // eslint-disable-line
  render() {
    return (
      <div style={appStyle}>
        <AppShell>
          <div style={contentStyle}>
            <CTABanner />
            <TemporaryBanner />
            <InitialLoading>
              <Switch>
                <Route
                  path={preferencePageRoute}
                  component={Preferences}
                />
                <Route
                  path={plansPageRoute}
                  component={Plans}
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
                  path={newConnectionRoute}
                  component={DefaultPage}
                />
                <Route
                  path={newBusinessTrialistsRoute}
                  component={OnboardingManager}
                />
              </Switch>
            </InitialLoading>
          </div>
        </AppShell>

        <Notifications />
        <AppSwitcher />
        <AppModals />
        <ThirdPartyWithRouter />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
