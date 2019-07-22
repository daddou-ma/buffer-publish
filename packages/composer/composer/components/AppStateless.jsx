import React  from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { ComposerSidepanel } from '@bufferapp/publish-shared-components';
import HashtagGroupWrapper from '@bufferapp/publish-hashtag-group-manager';
import Modals from '../components/Modals';
import NotificationContainer from '../components/NotificationContainer';
import ProfileSection from '../components/ProfileSection';
import ComposerSection from '../components/ComposerSection';
import UpdateSaver from '../components/UpdateSaver';
import { AppEnvironments } from '../AppConstants';
import styles from './css/App.css';
import ExtensionComponents from '../components/ExtensionComponents';
import { isOnExtension } from '../utils/extension';
import ComposerActionCreators from '../action-creators/ComposerActionCreators';

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
      isOnExtension(metaData) ? styles.floatingNotificationsContainerOnExtension :
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

const onCloseSidepanel = () => {
  ComposerActionCreators.updateToggleSidebarVisibility(null, false);
};

/**
 * Verifies if the sidebar should be visible by checking
 * that the current selected profile (s) is an instagram account
 *
 * @param bool omniboxEnabled
 * @param string expandedComposerId
 * @param bool composerSidebarVisible
 * @param array allSelectedProfiles
 */
const shouldShowSidepanel = (
  omniboxEnabled,
  expandedComposerId,
  composerSidebarVisible,
  allSelectedProfiles,
) => {
  const otherNetworkSelected = omniboxEnabled && allSelectedProfiles.some(profile => profile.service.name !== 'instagram');
  const shouldShowSidebar = !(otherNetworkSelected || expandedComposerId !== 'instagram');

  return shouldShowSidebar ? composerSidebarVisible : false;
};

const composerSidebarVisible = ({appState, omniboxEnabled}) => appState.composerSidebarVisible && !omniboxEnabled && appState.expandedComposerId === 'instagram';

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
  sentPost,
}) => {
  const allSelectedProfiles = selectedProfiles({ profiles });
  const omniboxEnabled = isOmniboxEnabled({ appState });
  const isSidepanelVisible = shouldShowSidepanel(
    omniboxEnabled,
    appState.expandedComposerId,
    appState.composerSidebarVisible,
    allSelectedProfiles,
  );

  const sidebarVisible = composerSidebarVisible({appState, omniboxEnabled});

  return (
    <div
      ref={appElementRef}
      className={styles.appWrapper}
      onClick={onAppWrapperClick}
    >
      <Modals />

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
        className={[
          styles.app,
          sidebarVisible ? styles.sidebarVisible : styles.sidebarNotVisible,
          'js-enable-dragging',
        ].join(' ')}
        style={appDynamicStyles({ position })}
        onClick={onAppClick}
      >
        <ExtensionComponents
          draggingAnchorRef={draggingAnchorRef}
          onCloseButtonClick={onCloseButtonClick}
          metadata={metaData}
        />

        {canSelectProfiles ?
          <ProfileSection
            appState={appState}
            profiles={profiles}
            userData={userData}
            visibleNotifications={visibleNotifications}
          /> : null}

        <ComposerSection
          isOmniboxEnabled={omniboxEnabled}
          appState={appState}
          profiles={profiles}
          shouldShowInlineSubprofileDropdown={
            shouldShowInlineSubprofileDropdown({ canSelectProfiles, profiles })
          }
          visibleNotifications={visibleNotifications}
          areAllDraftsSaved={areAllDraftsSaved}
          selectedProfiles={allSelectedProfiles}
          shouldEnableFacebookAutocomplete={
            shouldEnableFacebookAutocomplete({ metaData })
          }
          composerPosition={position}
          hasIGDirectFlip={userData.hasIGDirectFlip || false}
          hasIGLocationTaggingFeature={userData.hasIGLocationTaggingFeature || false}
          hasIGDirectVideoFlip={userData.hasIGDirectVideoFlip || false}
          hasShopgridFlip={userData.hasShopgridFlip || false}
          hasHashtagGroupsFlip={userData.hasHashtagGroupsFlip || false}
          isFreeUser={userData.isFreeUser || false}
          isBusinessUser={userData.isBusinessUser || false}
          canStartProTrial={userData.canStartProTrial || false}
          isOnProTrial={userData.isOnProTrial || false}
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
          isOmniboxEnabled={omniboxEnabled}
          selectedProfiles={allSelectedProfiles}
          sentPost={sentPost}
        />
        <ReactTooltip class={styles.tooltip} effect="solid" place="top" />
      </div>
      <ComposerSidepanel isVisible={isSidepanelVisible} onClose={() => onCloseSidepanel()}>
        <HashtagGroupWrapper
          viewMode={'manageHashtag'}
          hashtagGroups={[]}
        />
      </ComposerSidepanel>
    </div>
  );
};

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
  sentPost: PropTypes.bool,
};

AppStateless.defaultProps = {
  onNewPublish: false,
  scheduledAt: null,
  isPinnedToSlot: false,
  sentPost: false,
};

export default AppStateless;
