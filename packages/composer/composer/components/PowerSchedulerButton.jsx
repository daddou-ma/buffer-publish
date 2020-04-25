import React from 'react';
import PropTypes from 'prop-types';
import A from '../components/styled/A';
import styles from './css/PowerSchedulerButton.css';

const PowerSchedulerButton = props => {
  const alreadyHasQueryString = window.location.search !== '';
  const selectedProfileIds = props.selectedProfiles
    .map(profile => profile.id)
    .toString();
  const suffix = `${
    alreadyHasQueryString ? '&' : '?'
  }power_scheduler=y&selected_profiles=${selectedProfileIds}`;
  const href = window.location + suffix;

  const iconClassName = ['bi bi-new-tab', styles.newTabIcon].join(' ');

  return (
    <div>
      <A href={href} target="_blank" className={styles.powerSchedulerButton}>
        <i className={iconClassName} />
        Power Scheduler
      </A>
    </div>
  );
};

PowerSchedulerButton.propTypes = {
  selectedProfiles: PropTypes.array,
  visibleNotifications: PropTypes.array.isRequired,
};

export default PowerSchedulerButton;
