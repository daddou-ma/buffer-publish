/* eslint-disable jsx-a11y/label-has-for */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@bufferapp/ui';
import { NotificationTypes } from '../AppConstants';
import CloseButton from './styled/CloseButton';
import styles from './css/Notification.css';
import NotificationActionCreators from '../action-creators/NotificationActionCreators';

class Notification extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    showCloseIcon: PropTypes.bool.isRequired,
    showSoftAndHardCloseOptions: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    className: PropTypes.string,
    classNames: PropTypes.shape({
      notification: PropTypes.string,
      closeButton: PropTypes.string,
    }),
    cta: PropTypes.shape({
      label: PropTypes.string,
      action: PropTypes.func,
    }),
    children: PropTypes.node,
  };

  static defaultProps = {
    onClose: () => {},
    className: null,
    classNames: {
      notification: null,
      closeButton: null,
    },
    cta: null,
  };

  onCloseButtonClick = () => {
    const { id, showSoftAndHardCloseOptions, onClose } = this.props;
    const data = showSoftAndHardCloseOptions
      ? {
          isHardCloseCheckboxChecked: this.hardCloseCheckbox.checked,
          shouldCloseVisibleNotification: true,
        }
      : {};
    NotificationActionCreators.removeNotification(id, data);
    onClose();
  };

  onCheckboxChange = () => {
    const { id, showSoftAndHardCloseOptions, onClose } = this.props;
    const data = showSoftAndHardCloseOptions
      ? {
          isHardCloseCheckboxChecked: this.hardCloseCheckbox.checked,
          shouldCloseVisibleNotification: false,
        }
      : {};
    if (this.hardCloseCheckbox.checked) {
      NotificationActionCreators.removeNotification(id, data);
      onClose();
    } else if (this.hardCloseCheckbox.checked === false) {
      // if a user unchecks the notification, remove the cookie that was added
      NotificationActionCreators.removeNotificationCookie(id);
    }
  };

  render() {
    const {
      type,
      message,
      showCloseIcon,
      showSoftAndHardCloseOptions,
      className,
      classNames,
      cta,
      children,
    } = this.props;

    const htmlMessage = { __html: message };

    const notificationClassNamesMap = {
      [NotificationTypes.ERROR]: styles.errorNotification,
      [NotificationTypes.SUCCESS]: styles.successNotification,
      [NotificationTypes.INFO]: styles.infoNotification,
    };

    const notificationClassName = [
      showCloseIcon && showSoftAndHardCloseOptions
        ? styles.notificationWithCloseButtonAndCheckbox
        : showCloseIcon && !showSoftAndHardCloseOptions
        ? styles.notificationWithCloseButton
        : styles.notification,
      notificationClassNamesMap[type],
      classNames.notification || className,
    ].join(' ');

    const closeButtonClassName = [
      'bi bi-x',
      styles.closeButton,
      classNames.closeButton,
    ].join(' ');

    return (
      <div className={notificationClassName}>
        {cta && (
          <div className={styles.ctaContainer}>
            <Button
              type="primary"
              size="small"
              label={cta.label}
              onClick={cta.action}
            />
          </div>
        )}
        <div dangerouslySetInnerHTML={htmlMessage} />

        {showCloseIcon && (
          <CloseButton
            onClick={this.onCloseButtonClick}
            className={closeButtonClassName}
          />
        )}

        {children}

        {showSoftAndHardCloseOptions && (
          <div className={styles.hardCloseCheckboxContainer}>
            <label>
              <input
                type="checkbox"
                className={styles.hardCloseCheckbox}
                onChange={this.onCheckboxChange}
                ref={el => {
                  this.hardCloseCheckbox = el;
                }}
              />
              Don't show this message again
            </label>
          </div>
        )}
      </div>
    );
  }
}

export default Notification;
