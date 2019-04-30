import React, { Component } from 'react';
import { profilePageRoute, preferencePageRoute, childTabRoute } from '@bufferapp/publish-routes';
import { Route, Switch, withRouter } from 'react-router';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Sidebar from '@bufferapp/publish-sidebar';
import Notifications from '@bufferapp/notifications';
import ProfilePage from '@bufferapp/profile-page';
import Preferences from '@bufferapp/publish-preferences';
import AppSwitcher from '@bufferapp/publish-app-switcher';
import EnsurePublishBetaUser from '@bufferapp/publish-beta-redirect';
import AppModals from '@bufferapp/publish-modals';
import InitialLoading from '@bufferapp/publish-initial-loading';
import DefaultPage from '@bufferapp/default-page';
import CTABanner from '@bufferapp/publish-cta-banner';
import TemporaryBanner from '@bufferapp/publish-temporary-banner';
import PropTypes from 'prop-types';

const appStyle = {
  display: 'flex',
  height: '100%',
};

const contentStyle = {
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
};

// Can't use stateless function for App since then
// the `DragDropContext` doesn't work.
class App extends Component { // eslint-disable-line
  // Appcues triggers the display of content on page load.
  // Calling the Appcues.page() method will notify Appcues that
  // the page has changed and it should check again for content.
  componentDidUpdate(prevProps) {
    const { location: { pathname } } = this.props;
    const previousLocation = prevProps.location.pathname;

    if (pathname !== previousLocation) {
      window.Appcues.page();
    }
  }

  render() {
    return (
      <div style={appStyle}>
        <Sidebar activeProduct="publish" />

        <div style={contentStyle}>
          <CTABanner />
          <TemporaryBanner />
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

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

App.defaultProps = {
  location: '',
};

export default withRouter(DragDropContext(HTML5Backend)(App));
