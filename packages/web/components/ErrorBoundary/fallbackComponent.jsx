import React from 'react';
import style from './style';

class FittedFallbackComponent extends React.Component {
  static onRefresh() {
    location.reload();
  }

  render() {
    return (
      <div style={style.errorBoundaryFit}>
        <div style={style.errorBoundaryTitle}>Well this is embarrassing...</div>
        <div style={style.errorBoundaryMessage}>
          Something’s gone wrong. I’ve notified my human<br />
          creators who will look into this shortly.
        </div>
      </div>
    );
  }
}

export default FittedFallbackComponent;
