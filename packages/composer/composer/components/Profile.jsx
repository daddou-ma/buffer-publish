/**
 * Component that displays a profile
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import AppActionCreators from '../action-creators/AppActionCreators';
import { Services } from '../AppConstants';
import { escapeParens } from '../utils/StringUtils';
import styles from './css/Profile.css';
import BoardSelector from '../components/BoardSelector';
import Button from '../components/Button';
import Dropdown, {
  DropdownTrigger,
  DropdownContent,
} from '../components/Dropdown';
import { scrollIntoView } from '../utils/DOMUtils';

class Profile extends React.Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    expandedProfileSubprofileDropdownId: PropTypes.string,
    visibleNotifications: PropTypes.array.isRequired,
    addContainerScrollHandler: PropTypes.func.isRequired,
    removeContainerScrollHandler: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  componentDidMount() {
    if (this.hasSubprofiles()) {
      this.props.addContainerScrollHandler(this.onContainerScroll);

      const wasSubprofileDropdownJustExpanded =
        this.props.profile.id ===
        this.props.expandedProfileSubprofileDropdownId;

      if (wasSubprofileDropdownJustExpanded) this.scrollProfileIntoView();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.hasSubprofiles()) {
      const profileId = this.props.profile.id;
      const wasSubprofileDropdownExpanded =
        prevProps.expandedProfileSubprofileDropdownId === profileId;
      const wasSubprofileDropdownJustExpanded =
        !wasSubprofileDropdownExpanded && this.isSubprofileDropdownExpanded();

      if (wasSubprofileDropdownJustExpanded) this.scrollProfileIntoView();
    }
  }

  componentWillUnmount() {
    if (this.hasSubprofiles())
      this.props.removeContainerScrollHandler(this.onContainerScroll);
  }

  onContainerScroll = (e, scrollTop) => {
    const dropdownContent = ReactDOM.findDOMNode(this.refs.dropdownContent);
    const spacingFromProfileContainer = 5;

    const yTranslation =
      this.profileContainerTopOffset +
      this.profileContainerHeight +
      spacingFromProfileContainer -
      scrollTop;

    dropdownContent.style.top = 0; // Anchor to top of parent on scroll, until then keep natural pos
    dropdownContent.style.transform = `translateY(${yTranslation}px)`; // And translate accordingly
    dropdownContent.style.webkitTransform = `translateY(${yTranslation}px)`; // Manual prefixing
  };

  onClick = e => {
    const profile = this.props.profile;

    if (profile.isSelected) {
      // prevent dropdown from being expanded
      if (this.hasSubprofiles()) e.stopPropagation();
      AppActionCreators.unselectProfile(profile.id);
      AppActionCreators.trackUserAction(['composer', 'deselected_profile']);
    } else {
      if (this.hasSubprofiles()) return;
      AppActionCreators.selectProfile(profile.id);
      AppActionCreators.trackUserAction(['composer', 'selected_profile']);
    }

    e.preventDefault();
  };

  // Give DOM events that could possibly be causing this method to run an
  // opportunity to propagate to all handlers before collapsing the dropdown
  onSubprofileDropdownCollapsed = () =>
    setImmediate(() => {
      AppActionCreators.collapseProfileSubprofileDropdown(
        this.props.profile.id
      );
    });

  // Give DOM events that could possibly be causing this method to run an
  // opportunity to propagate to all handlers before expanding the dropdown
  onSubprofileDropdownExpanded = () =>
    setImmediate(() => {
      const { profile } = this.props;

      AppActionCreators.expandProfileSubprofileDropdown(profile.id);
      AppActionCreators.refreshSubprofileData(profile.id);
    });

  hasSubprofiles = () => {
    const service = Services.get(this.props.profile.service.name);
    return service.hasSubprofiles;
  };

  isSubprofileDropdownExpanded = () =>
    this.props.expandedProfileSubprofileDropdownId === this.props.profile.id;

  get profileContainerTopOffset() {
    if (!this._profileContainerTopOffset) {
      this._profileContainerTopOffset = this.refs.profileContainer.offsetTop; // Cache
    }

    return this._profileContainerTopOffset;
  }

  get profileContainerHeight() {
    if (!this._profileContainerHeight) {
      this._profileContainerHeight = this.refs.profileContainer.offsetHeight; // Cache
    }

    return this._profileContainerHeight;
  }

  scrollProfileIntoView = () => {
    scrollIntoView({
      elOffsets: [
        this.profileContainerTopOffset,
        this.profileContainerTopOffset + this.profileContainerHeight,
      ],
      ref: this.refs.profileContainer.parentElement,
      padding: 25,
    });
  };

  render() {
    const { profile, visibleNotifications } = this.props;
    const hasSubprofiles = this.hasSubprofiles();
    const formattedServiceType =
      profile.serviceType.charAt(0).toUpperCase() +
      profile.serviceType.slice(1);

    const profileContainerClassName = [
      profile.isDisabled
        ? styles.lockedProfileContainer
        : styles.profileContainer,
      profile.isDisabled ? 'bi bi-lock' : null,
      this.props.className,
      'js-disable-dragging',
    ].join(' ');

    const profileClassName = profile.isSelected
      ? styles.selectedProfile
      : styles.unselectedProfile;

    const profilePictureClassName = profile.isSelected
      ? styles.selectedProfilePicture
      : styles.unselectedProfilePicture;

    const profilePictureContainerClassName = profile.isSelected
      ? null
      : styles.unselectedProfilePictureContainer;

    const socialNetworkIconClassName = [
      styles[`${profile.service.name}Icon`],
      `bi bi-circle-${profile.service.name}`,
    ].join(' ');

    const profileDropdownTriggerClassName = this.isSubprofileDropdownExpanded()
      ? styles.expandedProfileDropdownTrigger
      : profile.isDisabled
      ? styles.lockedProfileDropdownTrigger
      : styles.profileDropdownTrigger;

    const profilePictureStyle = {
      backgroundImage: `url(${escapeParens(profile.images.avatar)})`,
    };

    const selectedText = profile.isSelected ? 'Selected profile' : '';

    const profileTooltipBaseContents = `${profile.service.username} - ${formattedServiceType}`;
    const profileTooltipContents = profile.isDisabled
      ? `${profileTooltipBaseContents} (${profile.disabledMessage || 'locked'})`
      : profileTooltipBaseContents;

    return (
      <div className={profileContainerClassName} ref="profileContainer">
        {hasSubprofiles && (
          <Dropdown
            isDropdownExpanded={this.isSubprofileDropdownExpanded()}
            onHide={this.onSubprofileDropdownCollapsed}
            onShow={this.onSubprofileDropdownExpanded}
            tabIndex="0"
            aria-role="button"
            aria-selected={profile.isSelected}
            disabled={profile.isDisabled}
          >
            <DropdownTrigger className={profileDropdownTriggerClassName}>
              <div
                className={profileClassName}
                onClick={this.onClick}
                data-tip={profileTooltipContents}
                aria-label={`${selectedText} ${profile.service.username} -
                        ${profile.service.name} ${formattedServiceType}`}
              >
                <span className={profilePictureContainerClassName}>
                  <span
                    className={profilePictureClassName}
                    style={profilePictureStyle}
                  />
                </span>
                <span className={socialNetworkIconClassName} />
              </div>
            </DropdownTrigger>
            <DropdownContent
              className={styles.dropdownContent}
              ref="dropdownContent"
            >
              <BoardSelector
                subprofiles={profile.subprofiles}
                profile={profile}
                subprofilesCount={profile.subprofiles.length}
                visibleNotifications={visibleNotifications}
              />
            </DropdownContent>
          </Dropdown>
        )}

        {!hasSubprofiles && (
          <div data-tip={profileTooltipContents}>
            <Button
              onClick={this.onClick}
              className={profileClassName}
              disabled={profile.isDisabled}
              aria-selected={profile.isSelected}
              aria-label={`${selectedText} ${profile.service.username} -
                      ${profile.service.name} ${formattedServiceType}`}
            >
              <span className={profilePictureContainerClassName}>
                <span
                  className={profilePictureClassName}
                  style={profilePictureStyle}
                />
              </span>
              <span className={socialNetworkIconClassName} />
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
