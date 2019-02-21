import React from 'react';
import { RefreshIcon, Text, Button } from '@bufferapp/components';
import PropTypes from 'prop-types';

const errorBoundaryContainer = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  padding: '16px',
  borderRadius: '4px',
  backgroundColor: '#E0364F',
};

const buttonWrapper = {
  display: 'flex',
};

const buttonText = {
  marginLeft: '0.5rem',
};

const errorMessage = {
  marginTop: '0.5rem',
  marginBottom: '0.5rem',
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  onRefresh() {
    location.reload();
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  errorTitle() {
    const { postId } = this.props;
    if (postId) {
      return 'Whoops, looks like we had some trouble with one of your posts';
    }

    return 'Well this is embarrassing...';
  }

  errorMessage() {
    const { postId } = this.props;
    if (postId) {
      return `Something’s gone wrong with your post # ${postId}. I’ve notified my human creators who will fix this up shortly.`;
    }

    return 'Something’s gone wrong. I’ve notified my human creators who will fix this up shortly.';
  }

  /*
  <Button
    secondary
    onClick={() => { this.onRefresh(); }}
  >
    <div style={buttonWrapper}>
      <RefreshIcon color={'curiousBlue'} size={{ width: '14px' }} />
      <span style={buttonText}>Refresh</span>
    </div>
  </Button>
  */

  render() {
    if (this.state.hasError) {
      return (
        <div style={errorBoundaryContainer}>
          <Text size={'large'} color={'white'}>
            {this.errorTitle()}
          </Text>
          <div style={errorMessage}>
            <Text size={'mini'} color={'white'}>
              {this.errorMessage()}
            </Text>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  postId: PropTypes.string,
};

ErrorBoundary.defaultProps = {
  postId: null,
};

export default ErrorBoundary;
