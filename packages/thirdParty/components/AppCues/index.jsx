import React from 'react';
import PropTypes from 'prop-types';

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

