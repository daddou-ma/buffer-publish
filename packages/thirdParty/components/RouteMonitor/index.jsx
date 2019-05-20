import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getProfilePageParams } from '@bufferapp/publish-routes';

function RouteMonitor({ pathname, appCues, intercom }) {
  useEffect(() => {
    // Appcues triggers the display of content on page load.
    // Calling the Appcues.page() method will notify Appcues that
    // the page has changed and it should check again for content.
    if (appCues && appCues.loaded && window.Appcues) {
      window.Appcues.page();

      const profilePageParams = getProfilePageParams({ path: pathname });
      if (profilePageParams && profilePageParams.tabId === 'analytics') {
        window.Appcues.track('Viewed Analytics Tab');
      }
    }

    // Let Intercom know when we've changed pages
    if (intercom && intercom.loaded && window.Intercom) {
      window.Intercom('update');
    }
  }, [pathname]);
  return null;
}

RouteMonitor.propTypes = {
  pathname: PropTypes.string,
  appCues: PropTypes.shape({
    loaded: PropTypes.bool,
  }),
  intercom: PropTypes.shape({
    loaded: PropTypes.bool,
  }),
};

RouteMonitor.defaultProps = {
  pathname: '',
  appCues: {
    loaded: false,
  },
  intercom: {
    loaded: false,
  },
};

export default RouteMonitor;
