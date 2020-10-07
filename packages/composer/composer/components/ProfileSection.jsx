/**
 * Component that shows the list of available profiles
 */
import React from 'react';
import PropTypes from 'prop-types';
import Profile from './Profile';
import ProfileGroups from './ProfileGroups';
import Button from './shared/Button';
import styles from './css/ProfileSection.css';
import AppActionCreators from '../action-creators/AppActionCreators';

class ProfileSection extends React.Component {
  scrollHandlers = new Set();

  onScroll = e => {
    if (e.target !== this.refs.profilesScrollContainer) return;

    const scrollTop = e.target.scrollTop;
    this.scrollHandlers.forEach(handler => handler(e, scrollTop));
  };

  onProfilesToggleClick = () => AppActionCreators.toggleAllProfiles();

  addContainerScrollHandler = handler => {
    this.scrollHandlers.add(handler);
  };

  removeContainerScrollHandler = handler => {
    this.scrollHandlers.delete(handler);
  };

  render() {
    const {
      appState,
      profiles,
      userData,
      visibleNotifications,
      organizations,
    } = this.props;
    const { hasProfileGroupsFeature } = organizations?.selected || {};
    const { profileGroups, onNewPublish } = userData;

    const shouldBeConsideredBusinessUser = hasProfileGroupsFeature;
    const hasEnoughProfiles = profiles.length > 9;

    const selectedProfilesIds = this.props.profiles
      .filter(profile => profile.isSelected)
      .map(profile => profile.id);
    const hasNoProfilesSelected = selectedProfilesIds.length === 0;
    const hasProfileGroups = profileGroups?.length > 0;

    const profilesTogglerClassName = [
      styles.profilesToggler,
      'js-disable-dragging',
    ].join(' ');

    return (
      <section className={styles.profileSection}>
        {shouldBeConsideredBusinessUser && hasEnoughProfiles && (
          <Button
            className={profilesTogglerClassName}
            onClick={this.onProfilesToggleClick}
          >
            <span className={styles.profilesTogglerCopy}>
              {hasNoProfilesSelected ? 'Select All' : 'Select None'}
            </span>
          </Button>
        )}

        {shouldBeConsideredBusinessUser &&
          hasEnoughProfiles &&
          hasProfileGroups && (
            <ProfileGroups
              groups={profileGroups}
              selectedProfilesIds={selectedProfilesIds}
              onNewPublish={onNewPublish}
            />
          )}

        <div className={styles.profilesContainer}>
          <ul
            onScroll={this.onScroll}
            className={styles.profilesScrollContainer}
            ref="profilesScrollContainer"
          >
            {profiles.map(profile => (
              <Profile
                profile={profile}
                expandedProfileSubprofileDropdownId={
                  appState.expandedProfileSubprofileDropdownId
                }
                addContainerScrollHandler={this.addContainerScrollHandler}
                removeContainerScrollHandler={this.removeContainerScrollHandler}
                visibleNotifications={visibleNotifications}
                className={styles.profile}
                key={profile.id}
              />
            ))}
          </ul>
        </div>
      </section>
    );
  }
}

ProfileSection.propTypes = {
  profiles: PropTypes.array.isRequired,
  appState: PropTypes.object.isRequired,
  userData: PropTypes.object,
  visibleNotifications: PropTypes.array.isRequired,
  organizations: PropTypes.object,
};

ProfileSection.defaultProps = {
  organizations: {},
};

export default ProfileSection;
