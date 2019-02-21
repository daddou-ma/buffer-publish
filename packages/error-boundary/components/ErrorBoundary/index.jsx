import React from 'react';
import { RefreshIcon, Text, Button } from '@bufferapp/components';
import { yellowUltraLight } from '@bufferapp/components/style/color';

const errorBoundaryContainer = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  border: '0.063rem solid rgb(230, 235, 239)',
  padding: '0.8rem',
  backgroundColor: yellowUltraLight,
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

export default class ErrorBoundary extends React.Component {
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

  render() {
    if (this.state.hasError) {
      return (
        <div style={errorBoundaryContainer}>
          <Text size={'large'} color={'black'}>
            Well this is embarrassing...
          </Text>
          <div style={errorMessage}>
            <Text size={'mini'} color={'black'}>
              Something’s gone wrong. I’ve notified my human creators who will fix this up shortly.
            </Text>
          </div>
          <Button
            secondary
            onClick={() => { this.onRefresh(); }}
          >
            <div style={buttonWrapper}>
              <RefreshIcon color={'curiousBlue'} size={{ width: '14px' }} /> <span style={buttonText}>Refresh</span>
            </div>
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
