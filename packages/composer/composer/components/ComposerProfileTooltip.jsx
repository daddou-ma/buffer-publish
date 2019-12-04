import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/ComposerProfileTooltip.css';

class ComposerProfileTooltip extends React.Component {
  static propTypes = {
    selectedProfilesForService: PropTypes.array.isRequired,
  };

  getFormattedServiceType = profile =>
    profile.serviceType.charAt(0).toUpperCase() + profile.serviceType.slice(1);

  getFormattedUsername = profile => {
    let username;
    if (
      profile.service.name === 'twitter' ||
      profile.service.name === 'instagram'
    ) {
      username = `@${profile.service.username}`;
    } else {
      username = profile.service.username;
    }
    return username;
  };
  render() {
    return (
      <ul className={styles.tooltipUL}>
        <h3 className={styles.title}>You've selected:</h3>
        {this.props.selectedProfilesForService.map(profile => (
          <li className={styles.tooltipItem} key={profile.id}>
            {this.getFormattedUsername(profile)} -{' '}
            {this.getFormattedServiceType(profile)}
          </li>
        ))}
      </ul>
    );
  }
}

export default ComposerProfileTooltip;
