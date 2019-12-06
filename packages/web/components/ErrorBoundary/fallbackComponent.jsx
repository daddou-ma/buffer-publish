import React from 'react';
import { Text } from '@bufferapp/ui';
import style from './style';

class FittedFallbackComponent extends React.Component {
  static onRefresh() {
    location.reload();
  }

  render() {
    return (
      <div style={style.errorBoundaryFit}>
        <Text type="h2">Well this is embarrassing...</Text>
        <div style={style.errorBoundaryMessage}>
          Something’s gone wrong. I’ve notified my human
          <br />
          creators who will look into this shortly.
        </div>
      </div>
    );
  }
}

export default FittedFallbackComponent;
