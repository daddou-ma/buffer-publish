import React from 'react';
import PropTypes from 'prop-types';
import NotificationContainer from '../components/NotificationContainer';
import { NotificationScopes } from '../AppConstants';
import A from '../components/shared/A';
import Button from '../components/shared/Button';
import NotificationActionCreators from '../action-creators/NotificationActionCreators';
import styles from './css/ProductRolloutTooltip.css';

class ProductRolloutTooltip extends React.Component {
  static propTypes = {
    visibleNotifications: PropTypes.array.isRequired,
  };

  // Prevent side-effects on composers' expanded state when clicking in the tooltip
  onTooltipClick = e => e.stopPropagation();

  onButtonClick = e => {
    e.stopPropagation();

    // There's only supposed to be one such notification at all times
    const productRolloutNotification = this.props.visibleNotifications.find(
      notif => notif.scope === NotificationScopes.MC_ROLLOUT_INFO
    );

    NotificationActionCreators.removeNotification(
      productRolloutNotification.id
    );
  };

  render() {
    const notificationContainerClassNames = {
      container: this.props.isOmniboxEnabled
        ? styles.bottomPositionedContained
        : styles.container,
      notification: styles.tooltip,
    };

    return (
      <NotificationContainer
        visibleNotifications={this.props.visibleNotifications}
        classNames={notificationContainerClassNames}
        scope={NotificationScopes.MC_ROLLOUT_INFO}
        onClick={this.onTooltipClick}
      >
        <Button className={styles.button} onClick={this.onButtonClick}>
          Awesome, got it!
        </Button>
        <A
          href="/new-buffer-composer"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </A>
      </NotificationContainer>
    );
  }
}

export default ProductRolloutTooltip;
