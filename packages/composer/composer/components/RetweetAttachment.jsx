import React from 'react';
import PropTypes from 'prop-types';
import CloseButton from './styled/CloseButton';
import AppActionCreators from '../action-creators/AppActionCreators';
import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import { AttachmentTypes } from '../AppConstants';

import styles from './css/RetweetAttachment.css';

class RetweetAttachment extends React.Component {
  static propTypes = {
    draftId: PropTypes.string.isRequired,
    retweet: PropTypes.object.isRequired,
  };

  onCloseButtonClick = () => {
    ComposerActionCreators.toggleAttachment(
      this.props.draftId,
      AttachmentTypes.RETWEET
    );
  };

  render() {
    const { text, userName, userDisplayName, avatarUrl } = this.props.retweet;

    const retweetIconClassName = [styles.retweetIcon, 'bi bi-retweet'].join(
      ' '
    );

    return (
      <div className={styles.retweetAttachment}>
        <img
          src={avatarUrl}
          alt="Retweeted user's avatar"
          className={styles.avatar}
        />

        <span className={styles.retweetLabel}>
          <i className={retweetIconClassName} /> Retweeted by you
        </span>

        <span className={styles.userDisplayName}>{userDisplayName}</span>
        <span className={styles.userName}>@{userName}</span>
        <p className={styles.text}>{text}</p>

        <CloseButton
          className={styles.closeButton}
          onClick={this.onCloseButtonClick}
          data-tip="Disable Native Retweet Mode"
        />
      </div>
    );
  }
}

export default RetweetAttachment;
