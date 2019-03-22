import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState(ErrorBoundary.getDerivedStateFromError(error));
    /* eslint-disable no-console */
    if (typeof console !== 'undefined' && typeof console.log !== 'undefined') {
      console.log({ error, info });
    }
    /* eslint-enable no-console */
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallbackComponent) {
        const FallbackComponent = this.props.fallbackComponent;
        return <FallbackComponent />;
      }
      return <h1>Something has gone wrong. Our team has been informed of the error.</h1>;
    }

    return this.props.children ? this.props.children : null;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  fallbackComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

ErrorBoundary.defaultProps = {
  children: null,
  fallbackComponent: null,
};

export default ErrorBoundary;
