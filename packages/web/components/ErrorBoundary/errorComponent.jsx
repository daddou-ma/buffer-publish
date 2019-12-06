import React from 'react';
import { Text, Button } from '@bufferapp/ui';
import RefreshIcon from '@bufferapp/ui/Icon/Icons/Refresh';
import style from './style';

class BoundaryFallback extends React.Component {
  static onRefresh() {
    return location.reload();
  }

  render() {
    return (
      <div style={style.errorBoundary}>
        <Text type="h2">Well this is embarrassing...</Text>
        <div style={style.errorBoundaryMessage}>
          Something’s gone wrong. I’ve notified my human
          <br />
          creators who will fix this up shortly.
        </div>
        <Button
          type="secondary"
          label="Refresh"
          icon={<RefreshIcon />}
          onClick={() => {
            BoundaryFallback.onRefresh();
          }}
        />
      </div>
    );
  }
}

export default BoundaryFallback;
