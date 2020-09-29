import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { ComposerSidepanel } from '@bufferapp/publish-shared-components';
import HashtagGroupWrapper from '@bufferapp/publish-hashtag-group-manager';
import { AppEnvironments } from '@bufferapp/publish-constants';
import Modals from './Modals';
import NotificationContainer from './NotificationContainer';
import ProfileSection from './ProfileSection';
import ComposerSection from './ComposerSection';
import UpdateSaver from './UpdateSaver';
import styles from './css/App.css';
import ExtensionComponents from './ExtensionComponents';
import { isOnExtension } from '../utils/extension';
import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import CampaignHeader from './campaigns/CampaignHeader';

class AppStateless extends React.Component {
  constructor(props) {
    super(props);
    this.selectedProfiles = this.selectedProfiles.bind(this);
    this.shouldShowInlineSubprofileDropdown = this.shouldShowInlineSubprofileDropdown.bind(
      this
    );
    this.firstSelectedProfileTimezone = this.firstSelectedProfileTimezone.bind(
      this
    );
    this.isSlotPickingAvailable = this.isSlotPickingAvailable.bind(this);
    this.moreThanOneProfileSelected = this.moreThanOneProfileSelected.bind(
      this
    );
    this.notificationContainerDynamicStyles = this.notificationContainerDynamicStyles.bind(
      this
    );
  }

  onCloseSidepanel() {
    ComposerActionCreators.updateToggleSidebarVisibility(null, false);
  }

  onInsertHashtagGroupClick(text) {
    ComposerActionCreators.updateDraftComment(null, text);
    ComposerActionCreators.updateDraftCommentCharacterCount(null);
  }

  selectedProfiles(profiles) {
    return profiles.filter(profile => profile.isSelected);
  }

  notificationsContainerClassNames({ onNewPublish, metaData }) {
    let container = styles.floatingNotificationsContainerOnLegacyWeb;

    if (onNewPublish) {
      container = styles.floatingNotificationsContainerOnPublish;
    } else if (isOnExtension(metaData)) {
      container = styles.floatingNotificationsContainerOnExtension;
    }

    return {
      container,
      notification: styles.floatingNotification,
    };
  }

  appDynamicStyles(position) {
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
  }

  /**
   * Verifies if the sidebar should be visible by checking
   * that the current selected profile (s) is an instagram account
   *
   * @param {bool | null} omniboxEnabled
   * @param {string | null} expandedComposerId
   * @param {bool} composerSidebarVisible
   * @param {array} allSelectedProfiles
   */
  shouldShowSidepanel({
    omniboxEnabled,
    expandedComposerId,
    isComposerSidebarVisible,
    allSelectedProfiles,
  }) {
    const otherNetworkSelected =
      omniboxEnabled &&
      allSelectedProfiles.some(profile => profile.service.name !== 'instagram');
    const shouldShowSidebar = !(
      otherNetworkSelected || expandedComposerId !== 'instagram'
    );

    return shouldShowSidebar ? isComposerSidebarVisible : false;
  }

  composerSidebarVisible({ appState, omniboxEnabled }) {
    return (
      appState.composerSidebarVisible &&
      !omniboxEnabled &&
      appState.expandedComposerId === 'instagram'
    );
  }

  notificationContainerDynamicStyles({ metaData, onNewPublish, position }) {
    let dynamicStyles = {};
    const { appEnvironment } = metaData;
    const isOnLegacyWeb =
      appEnvironment === AppEnvironments.WEB_DASHBOARD && !onNewPublish;
    if (isOnLegacyWeb && position !== null) {
      const shouldOverrideVerticalPositioningOnly =
        typeof position.left === 'undefined';

      dynamicStyles = {
        ...this.appDynamicStyles(position),
        top: `${position.top - 56}px`,
      };

      if (shouldOverrideVerticalPositioningOnly) {
        dynamicStyles.width = '100%';
      }
    }
    return dynamicStyles;
  }

  shouldShowInlineSubprofileDropdown({ canSelectProfiles, profiles }) {
    return !canSelectProfiles && this.selectedProfiles(profiles).length === 1;
  }

  firstSelectedProfileTimezone(profiles) {
    const selected = this.selectedProfiles(profiles);
    const firstSelectedProfile = selected[0];
    return firstSelectedProfile ? firstSelectedProfile.timezone : null;
  }

  isSlotPickingAvailable(profiles) {
    return this.selectedProfiles(profiles).length === 1;
  }

  moreThanOneProfileSelected(profiles) {
    return this.selectedProfiles(profiles).length > 1;
  }

  render() {
    const {
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
      organizations,
      scheduledAt,
      areAllDraftsSaved,
      saveButtons,
      isPinnedToSlot,
      availableSchedulesSlotsForDay,
      sentPost,
      draftMode,
    } = this.props;

    const allSelectedProfiles = this.selectedProfiles(profiles);
    const omniboxEnabled = appState.isOmniboxEnabled;
    const isSidepanelVisible = this.shouldShowSidepanel({
      omniboxEnabled,
      expandedComposerId: appState.expandedComposerId,
      isComposerSidebarVisible: appState.composerSidebarVisible,
      allSelectedProfiles,
    });

    const sidebarVisible = this.composerSidebarVisible({
      appState,
      omniboxEnabled,
    });

    const shouldDisplayCampaignHeader =
      organizations?.selected?.hasCampaignsFeature && !draftMode;
    const campaignId = metaData.campaignDetails?.id ?? null;
    const campaigns = metaData.campaigns ?? [];

    return (
      <div
        ref={appElementRef}
        className={styles.appWrapper}
        onClick={onAppWrapperClick}
        role="button"
        tabIndex={0}
      >
        <Modals />

        <NotificationContainer
          visibleNotifications={visibleNotifications}
          classNames={this.notificationsContainerClassNames({
            onNewPublish,
            metaData,
          })}
          style={this.notificationContainerDynamicStyles({
            metaData,
            onNewPublish,
            position,
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
          style={this.appDynamicStyles(position)}
          onClick={onAppClick}
          role="button"
          tabIndex={0}
        >
          {shouldDisplayCampaignHeader && (
            <CampaignHeader campaigns={campaigns} campaignId={campaignId} />
          )}

          <ExtensionComponents
            draggingAnchorRef={draggingAnchorRef}
            onCloseButtonClick={onCloseButtonClick}
            metadata={metaData}
          />

          {canSelectProfiles ? (
            <ProfileSection
              appState={appState}
              profiles={profiles}
              userData={userData}
              organizations={organizations}
              visibleNotifications={visibleNotifications}
            />
          ) : null}

          <ComposerSection
            isOmniboxEnabled={omniboxEnabled}
            appState={appState}
            profiles={profiles}
            organizations={organizations}
            shouldShowInlineSubprofileDropdown={this.shouldShowInlineSubprofileDropdown(
              { canSelectProfiles, profiles }
            )}
            visibleNotifications={visibleNotifications}
            areAllDraftsSaved={areAllDraftsSaved}
            selectedProfiles={allSelectedProfiles}
            shouldEnableFacebookAutocomplete={
              metaData.shouldEnableFacebookAutocomplete
            }
            composerPosition={position}
            draftMode={draftMode}
          />

          <UpdateSaver
            appState={appState}
            metaData={metaData}
            userData={userData}
            timezone={this.firstSelectedProfileTimezone(profiles)}
            saveButtons={saveButtons}
            scheduledAt={scheduledAt}
            isSlotPickingAvailable={this.isSlotPickingAvailable(profiles)}
            isPinnedToSlot={isPinnedToSlot}
            availableSchedulesSlotsForDay={availableSchedulesSlotsForDay}
            visibleNotifications={visibleNotifications}
            moreThanOneProfileSelected={this.moreThanOneProfileSelected(
              profiles
            )}
            areAllDraftsSaved={areAllDraftsSaved}
            whatPreventsSavingMessages={appState.whatPreventsSaving}
            isOmniboxEnabled={omniboxEnabled}
            selectedProfiles={allSelectedProfiles}
            sentPost={sentPost}
          />
          <ReactTooltip class={styles.tooltip} effect="solid" place="top" />
        </div>
        <ComposerSidepanel
          isVisible={isSidepanelVisible}
          onClose={this.onCloseSidepanel}
        >
          {isSidepanelVisible && (
            <HashtagGroupWrapper
              viewMode="manageHashtag"
              onInsertHashtagGroupClick={this.onInsertHashtagGroupClick}
            />
          )}
        </ComposerSidepanel>
      </div>
    );
  }
}

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
  visibleNotifications: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  topLevelNotificationContainerExcludedScopes: PropTypes.any.isRequired, // eslint-disable-line
  userData: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  scheduledAt: PropTypes.number,
  areAllDraftsSaved: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  saveButtons: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  availableSchedulesSlotsForDay: PropTypes.any, // eslint-disable-line
  isPinnedToSlot: PropTypes.bool,
  sentPost: PropTypes.bool,
  draftMode: PropTypes.bool,
};

AppStateless.defaultProps = {
  onNewPublish: false,
  scheduledAt: null,
  isPinnedToSlot: false,
  sentPost: false,
  draftMode: false,
};

export default AppStateless;
