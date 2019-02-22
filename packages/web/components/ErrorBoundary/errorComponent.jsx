import React from 'react';
import { RefreshIcon, Button } from '@bufferapp/components';
import './errorBoundary.css';

class BoundaryFallback extends React.Component {
  static onRefresh() {
    location.reload();
  }

  render() {
    return (
      <div className="error-boundary">
        <div className="error-boundary__title">Well this is embarrassing...</div>
        <div className="error-boundary__message">
          Something’s gone wrong. I’ve notified my
          human<br />creators who will fix this up shortly.
        </div>
        <Button
          secondary
          onClick={() => {
            BoundaryFallback.onRefresh();
          }}
        >
          <div className="button-wrapper">
            <RefreshIcon color={'curiousBlue'} size={{ width: '14px' }} />
            <span className="button-text">Refresh</span>
          </div>
        </Button>
      </div>
    );
  }
}

export default BoundaryFallback;
