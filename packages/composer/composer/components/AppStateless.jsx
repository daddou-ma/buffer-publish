import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import Modals from '../components/Modals';
import PowerSchedulerButton from '../components/PowerSchedulerButton';
import NotificationContainer from '../components/NotificationContainer';
import CloseButton from '../components/CloseButton';
import ProfileSection from '../components/ProfileSection';
import ComposerSection from '../components/ComposerSection';
import UpdateSaver from '../components/UpdateSaver';
import { AppEnvironments } from '../AppConstants';
import styles from './css/App.css';

const draggingAnchorClassName = [
  'bi bi-drag',
  styles.draggingAnchor,
].join(' ');

const closeButtonClassName = [
  'bi bi-x',
  styles.closeButton,
].join(' ');

const appClassName = [
  styles.app,
  'js-enable-dragging',
].join(' ');

const ExtensionComponents = ({
  draggingAnchorRef,
  onCloseButtonClick,
}) => (
  <Fragment>
    <span
      className={draggingAnchorClassName}
      ref={draggingAnchorRef}
    />
    <CloseButton
      className={closeButtonClassName}
      onClick={onCloseButtonClick}
    />
  </Fragment>
);

ExtensionComponents.propTypes = {
  draggingAnchorRef: PropTypes.func.isRequired,
  onCloseButtonClick: PropTypes.func.isRequired,
};

const isOnExtension = ({ metaData }) =>
  metaData.appEnvironment === AppEnvironments.EXTENSION;

const showPowerSchedulerButton = ({ metaData }) => isOnExtension({ metaData });

const shouldEnableFacebookAutocomplete = ({ metaData }) =>
  metaData.shouldEnableFacebookAutocomplete;

const isOnLegacyWeb = ({
  metaData,
  onNewPublish,
}) =>
  metaData.appEnvironment === AppEnvironments.WEB_DASHBOARD && !onNewPublish;

const isOmniboxEnabled = ({ appState }) => appState.isOmniboxEnabled;

const appDynamicStyles = ({
  position,
}) => {
  const dynamicStyles = {};
  if (position !== null) {
    const shouldOverrideVerticalPositioningOnly =
      typeof position.left === 'undefined';

    if (shouldOverrideVerticalPositioningOnly) {
      dynamicStyles.margin = '0 auto';
      dynamicStyles.top = `${position.top}px`;
    } else {
      dynamicStyles.position = 'absolute';
      dynamicStyles.margin = `${position.margin}` || 0;
      dynamicStyles.top = `${position.top}px`;
      dynamicStyles.left = `${position.left}px`;
    }
  }
  return dynamicStyles;
};

const notificationContainerDynamicStyles = ({
  metaData,
  onNewPublish,
  position,
}) => {
  let dynamicStyles = {};
  if (isOnLegacyWeb({ metaData, onNewPublish }) && position !== null) {
    const shouldOverrideVerticalPositioningOnly = typeof position.left === 'undefined';

    dynamicStyles = {
      ...appDynamicStyles({ position }),
      top: `${position.top - 56}px`,
    };

    if (shouldOverrideVerticalPositioningOnly) {
      dynamicStyles.width = '100%';
    }
  }
  return dynamicStyles;
};

const notificationsContainerClassNames = ({
  onNewPublish,
  metaData,
}) => ({
  container: (
    onNewPublish ? styles.floatingNotificationsContainerOnPublish :
      isOnExtension({ metaData }) ? styles.floatingNotificationsContainerOnExtension :
        styles.floatingNotificationsContainerOnLegacyWeb
  ),
  notification: styles.floatingNotification,
});

const selectedProfiles = ({ profiles }) =>
  profiles.filter((profile) => profile.isSelected);

const shouldShowInlineSubprofileDropdown = ({
  canSelectProfiles,
  profiles,
}) =>
  !canSelectProfiles && selectedProfiles({ profiles }).length === 1;

const firstSelectedProfileTimezone = ({ profiles }) => {
  const selected = selectedProfiles({ profiles });
  const firstSelectedProfile = selected[0];
  return firstSelectedProfile ? firstSelectedProfile.timezone : null;
};

const isSlotPickingAvailable = ({ profiles }) =>
  selectedProfiles({ profiles }).length === 1;

const moreThanOneProfileSelected = ({ profiles }) =>
  selectedProfiles({ profiles }).length > 1;

const AppStateless = ({
  onAppWrapperClick,
  onAppClick,
  onCloseButtonClick,
  draggingAnchorRef,
  appElementRef,
  metaData,
  onNewPublish,
  position,
  canSelectProfiles,
  appState,
  profiles,
  visibleNotifications,
  topLevelNotificationContainerExcludedScopes,
  userData,
  scheduledAt,
  areAllDraftsSaved,
  saveButtons,
  isPinnedToSlot,
  availableSchedulesSlotsForDay,
}) => (
  <div
    ref={appElementRef}
    className={styles.appWrapper}
    onClick={onAppWrapperClick}
  >
    <Modals />
    {showPowerSchedulerButton({ metaData }) &&
      <PowerSchedulerButton
        selectedProfiles={selectedProfiles({ profiles })}
        visibleNotifications={visibleNotifications}
      />
    }

    <NotificationContainer
      visibleNotifications={visibleNotifications}
      classNames={notificationsContainerClassNames({
        onNewPublish,
        metaData,
      })}
      style={notificationContainerDynamicStyles({
        metaData,
        onNewPublish,
        position,
        appDynamicStyles,
      })}
      notScopes={topLevelNotificationContainerExcludedScopes}
      showCloseIcon
    />

    <div
      className={appClassName}
      style={appDynamicStyles({ position })}
      onClick={onAppClick}
    >
      {isOnExtension({ metaData }) ?
        <ExtensionComponents
          draggingAnchorRef={draggingAnchorRef}
          onCloseButtonClick={onCloseButtonClick}
        /> : null}

      {canSelectProfiles ?
        <ProfileSection
          appState={appState}
          profiles={profiles}
          userData={userData}
          visibleNotifications={visibleNotifications}
        /> : null}

      <ComposerSection
        isOmniboxEnabled={isOmniboxEnabled({ appState })}
        appState={appState}
        profiles={profiles}
        shouldShowInlineSubprofileDropdown={
          shouldShowInlineSubprofileDropdown({ canSelectProfiles, profiles })
        }
        visibleNotifications={visibleNotifications}
        areAllDraftsSaved={areAllDraftsSaved}
        selectedProfiles={selectedProfiles({ profiles })}
        shouldEnableFacebookAutocomplete={
          shouldEnableFacebookAutocomplete({ metaData })
        }
        composerPosition={position}
        hasIGDirectFlip={userData.hasIGDirectFlip || false}
        hasIGLocationTaggingFeature={userData.hasIGLocationTaggingFeature || false}
        hasIGDirectVideoFlip={userData.hasIGDirectVideoFlip || false}
        hasFirstCommentFlip={userData.hasFirstCommentFlip || false}
        isFreeUser={userData.isFreeUser || false}
        isBusinessUser={userData.isBusinessUser || false}
        userShouldSeeProTrialModal={userData.canStartProTrial || false}
      />

      <UpdateSaver
        appState={appState}
        metaData={metaData}
        userData={userData}
        timezone={firstSelectedProfileTimezone({ profiles })}
        saveButtons={saveButtons}
        scheduledAt={scheduledAt}
        isSlotPickingAvailable={isSlotPickingAvailable({ profiles })}
        isPinnedToSlot={isPinnedToSlot}
        availableSchedulesSlotsForDay={availableSchedulesSlotsForDay}
        visibleNotifications={visibleNotifications}
        moreThanOneProfileSelected={moreThanOneProfileSelected({ profiles })}
        areAllDraftsSaved={areAllDraftsSaved}
        whatPreventsSavingMessages={appState.whatPreventsSaving}
        isOmniboxEnabled={isOmniboxEnabled({ appState })}
      />
      <ReactTooltip class={styles.tooltip} effect="solid" place="top" />
    </div>
  </div>
);

// TODO: use objectOf with shape for eslint disabled lines
AppStateless.propTypes = {
  onAppWrapperClick: PropTypes.func.isRequired,
  onAppClick: PropTypes.func.isRequired,
  onCloseButtonClick: PropTypes.func.isRequired,
  draggingAnchorRef: PropTypes.func.isRequired,
  appElementRef: PropTypes.func.isRequired,
  metaData: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  onNewPublish: PropTypes.bool,
  position: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  canSelectProfiles: PropTypes.bool.isRequired,
  appState: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  profiles: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  visibleNotifications: PropTypes.array.isRequired,
  topLevelNotificationContainerExcludedScopes: PropTypes.any.isRequired, // eslint-disable-line
  userData: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  scheduledAt: PropTypes.number,
  areAllDraftsSaved: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  saveButtons: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  availableSchedulesSlotsForDay: PropTypes.any, // eslint-disable-line
  isPinnedToSlot: PropTypes.bool,
};

AppStateless.defaultProps = {
  onNewPublish: false,
  scheduledAt: null,
  isPinnedToSlot: false,
};

export default AppStateless;
