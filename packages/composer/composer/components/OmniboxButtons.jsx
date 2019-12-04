import React from 'react';
import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import Button from '../components/Button';
import styles from './css/OmniboxButtons.css';

class OmniboxButtons extends React.Component {
  onCustomizeButtonClick = () => {
    ComposerActionCreators.applyOmniUpdate();
  };

  render() {
    const rightArrowClass = ['bi bi-arrow-long-right', styles.rightArrow].join(
      ' '
    );

    return (
      <Button
        onClick={this.onCustomizeButtonClick}
        className={styles.customizeButton}
      >
        Customize for each network
        <i className={rightArrowClass} />
      </Button>
    );
  }
}

export default OmniboxButtons;
