import React from 'react';
import PropTypes from 'prop-types';
import { getProfilePageParams } from '@bufferapp/publish-routes';

class AppCues extends React.Component {
  // Appcues triggers the display of content on page load.
  // Calling the Appcues.page() method will notify Appcues that
  // the page has changed and it should check again for content.
  componentDidUpdate(prevProps) {
    const { location: { pathname }, appCues } = this.props;
    if (appCues && appCues.loaded) {
      const previousLocation = prevProps.location.pathname;
      if (pathname !== previousLocation && window && window.Appcues) {
        window.Appcues.page();

        const { tabId } = getProfilePageParams({ path: pathname });
        if (tabId === 'analytics') {
          window.Appcues.track('Viewed Analytics Tab');
        }
      }
    }
  }

  render() {
    return null;
  }

}
AppCues.propTypes = {
  appCues: PropTypes.shape({
    loaded: PropTypes.bool,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};
AppCues.defaultProps = {
  location: {},
  appCues: {
    loaded: false,
  },
};


export default AppCues;

