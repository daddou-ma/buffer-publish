import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getProfilesParams } from '@bufferapp/publish-routes';
import { updateHelpCenterSuggestions } from '../../zendesk-widget';

function RouteMonitor({ pathname, appCues, zendeskWidget }) {
  useEffect(() => {
    // Appcues triggers the display of content on page load.
    // Calling the Appcues.page() method will notify Appcues that
    // the page has changed and it should check again for content.
    if (appCues && appCues.loaded && window && window.Appcues) {
      window.Appcues.page();

      const profilePageParams = getProfilesParams({ pathname });
      if (profilePageParams && profilePageParams.tabId === 'analytics') {
        window.Appcues.track('Viewed Analytics Tab');
      }

      if (profilePageParams && profilePageParams.tabId === 'grid') {
        window.Appcues.track('Viewed Shop Grid Tab');
      }
    }

    // Let Zendesk Widget know when we've changed pages
    if (zendeskWidget && zendeskWidget.loaded && window && window.zE) {
      updateHelpCenterSuggestions(pathname);
    }
  }, [pathname]);
  return null;
}

RouteMonitor.propTypes = {
  pathname: PropTypes.string,
  appCues: PropTypes.shape({
    loaded: PropTypes.bool,
    inProgress: PropTypes.bool,
  }),
};

RouteMonitor.defaultProps = {
  pathname: '',
  appCues: {
    loaded: false,
    inProgress: false,
  },
};

export default RouteMonitor;
