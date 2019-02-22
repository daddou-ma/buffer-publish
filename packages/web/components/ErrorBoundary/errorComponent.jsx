import React from 'react';
import { RefreshIcon, Button } from '@bufferapp/components';
import style from './style';

class BoundaryFallback extends React.Component {
  static onRefresh() {
    location.reload();
  }

  render() {
    return (
      <div style={style.errorBoundary}>
        <div style={style.errorBoundaryTitle}>Well this is embarrassing...</div>
        <div style={style.errorBoundaryMessage}>
          Something’s gone wrong. I’ve notified my
          human<br />creators who will fix this up shortly.
        </div>
        <Button
          secondary
          onClick={() => {
            BoundaryFallback.onRefresh();
          }}
        >
          <div style={style.buttonWrapper}>
            <RefreshIcon color={'curiousBlue'} size={{ width: '14px' }} />
            <span style={style.buttonText}>Refresh</span>
          </div>
        </Button>
      </div>
    );
  }
}

export default BoundaryFallback;
