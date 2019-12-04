import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error,
      info,
    });
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
        return <FallbackComponent {...this.state} />;
      }
      if (this.props.defaultFallbackComponent) {
        const FallbackComponent = this.props.defaultFallbackComponent;
        return <FallbackComponent {...this.state} />;
      }
      return (
        <h1>
          Something has gone wrong. Our team has been informed of the error.
        </h1>
      );
    }

    return this.props.children ? this.props.children : null;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  fallbackComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  defaultFallbackComponent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
};

ErrorBoundary.defaultProps = {
  children: null,
  fallbackComponent: null,
  defaultFallbackComponent: null,
};

export default ErrorBoundary;
