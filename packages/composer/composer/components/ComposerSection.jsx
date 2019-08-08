import React from 'react';
import PropTypes from 'prop-types';
import uniqBy from 'lodash.uniqby';
import AppStore from '../stores/AppStore';
import ComposerStore from '../stores/ComposerStore';
import AppActionCreators from '../action-creators/AppActionCreators';
import { NotificationScopes } from '../AppConstants';
import Composer from '../components/Composer';
import ProductRolloutTooltip from '../components/ProductRolloutTooltip';
import NotificationContainer from '../components/NotificationContainer';
import styles from './css/ComposerSection.css';
import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import { selectedProfileStorageName } from '../utils/StringUtils';

const getComposerState = () => ({
  enabledDrafts: ComposerStore.getEnabledDrafts(),
  draftsSharedData: ComposerStore.getDraftsSharedData(),
  omniDraft: ComposerStore.getDraft('omni'),
  forceEditorFocus: ComposerStore.getMeta().forceEditorFocus,
});

/* eslint-disable react/prop-types */
const ComposerComponent = ({
    draft,
    index,
    state,
    profiles,
    isOmniboxEnabled,
    enabledDrafts,
    AppStore,
    visibleNotifications,
    appState,
    draftsSharedData,
    areAllDraftsSaved,
    selectedProfiles,
    shouldEnableFacebookAutocomplete,
    shouldShowInlineSubprofileDropdown,
    composerPosition,
    hasIGDirectFlip,
    hasIGLocationTaggingFeature,
    canStartProTrial,
    isOnProTrial,
    hasIGDirectVideoFlip,
    hasShopgridFlip,
    hasHashtagGroupsFlip,
    isFreeUser,
    isBusinessUser,
    hasRestoreComposerDataFlip,
    draftMode,
  }) => {
  const canUserPostToMultipleNetworks = uniqBy(profiles, (p) => p.service.name).length > 1;
  const showRolloutTooltip = (
    AppStore.getOptions().canSelectProfiles &&
    canUserPostToMultipleNetworks &&
    (isOmniboxEnabled || index === enabledDrafts.length - 1)
  );
  const { editMode } = AppStore.getOptions();

  const children =
    showRolloutTooltip ?
      (<ProductRolloutTooltip
        visibleNotifications={visibleNotifications}
        isOmniboxEnabled={isOmniboxEnabled}
      />) :
      null;

  // When focus should be forced, figure out *which* editor instance to force-focus
  const forceEditorInstanceFocus = (
    state.forceEditorFocus &&
    (isOmniboxEnabled || appState.expandedComposerId === draft.id)
  );

  return (
    <Composer
      appState={appState}
      draft={draft}
      key={draft.id}
      enabledDrafts={enabledDrafts}
      draftsSharedData={draftsSharedData}
      profiles={profiles}
      expandedComposerId={isOmniboxEnabled ? draft.id : appState.expandedComposerId}
      visibleNotifications={visibleNotifications}
      areAllDraftsSaved={areAllDraftsSaved}
      selectedProfiles={selectedProfiles}
      shouldEnableFacebookAutocomplete={shouldEnableFacebookAutocomplete}
      shouldShowInlineSubprofileDropdown={shouldShowInlineSubprofileDropdown}
      composerPosition={composerPosition}
      hasIGDirectFlip={hasIGDirectFlip}
      forceEditorFocus={forceEditorInstanceFocus}
      hasIGLocationTaggingFeature={hasIGLocationTaggingFeature}
      canStartProTrial={canStartProTrial}
      isOnProTrial={isOnProTrial}
      hasIGDirectVideoFlip={hasIGDirectVideoFlip}
      hasShopgridFlip={hasShopgridFlip}
      hasHashtagGroupsFlip={hasHashtagGroupsFlip}
      isFreeUser={isFreeUser}
      isBusinessUser={isBusinessUser}
      editMode={editMode}
      hasRestoreComposerDataFlip={hasRestoreComposerDataFlip}
      draftMode={draftMode}
    >
      {children}
    </Composer>
  );
};
/* eslint-enable react/prop-types */

class ComposerSection extends React.Component {
  constructor(props) {
    super(props);

    const { editMode, sentPost } = AppStore.getOptions();
    const { hasRestoreComposerDataFlip } = AppStore.getUserData();
    const selectedProfiles = JSON.parse(localStorage.getItem(selectedProfileStorageName));
    const shouldLoadFromStorage = hasRestoreComposerDataFlip && (!sentPost && editMode === false);

    if (shouldLoadFromStorage) {
      if (selectedProfiles && selectedProfiles.profiles) {
        AppActionCreators.selectProfiles(selectedProfiles.profiles.map(profile => profile.id),
          false, false);
      }
      ComposerActionCreators.getEnabledDraftsFromStorage();
    }
  }

  state = getComposerState();

  componentDidMount = () => ComposerStore.addChangeListener(this.onStoreChange);
  componentWillUnmount = () => ComposerStore.removeChangeListener(this.onStoreChange);
  onStoreChange = () => this.setState(getComposerState());

  onTwitterMaxProfileNotificationClose = () => {
    AppActionCreators.rememberTwitterMaxProfileNotificationClosedOnce();
  };

  render() {
    const { enabledDrafts, draftsSharedData, omniDraft } = this.state;

    const {
      appState, profiles, visibleNotifications, areAllDraftsSaved, selectedProfiles,
      shouldEnableFacebookAutocomplete, shouldShowInlineSubprofileDropdown,
      isOmniboxEnabled, composerPosition, hasIGDirectFlip, hasIGLocationTaggingFeature,
      hasIGDirectVideoFlip, isFreeUser, isBusinessUser, canStartProTrial,
      isOnProTrial, hasShopgridFlip, hasHashtagGroupsFlip, draftMode, hasRestoreComposerDataFlip,
    } = this.props;

    const hasEnabledDrafts = enabledDrafts.length > 0 || isOmniboxEnabled;
    const composersHaveBeenExpanded = appState.composersHaveBeenExpanded;

    const twitterMaxProfileNotificationClassNames = {
      container: styles.twitterMaxProfileNotificationContainer,
      notification: `${styles.twitterMaxProfileNotification} bi-notification`,
      notificationCloseButton: styles.twitterMaxProfileNotificationCloseButton,
    };

    return (
      <div className={styles.composerSection}>
        {!hasEnabledDrafts && (
          <div className={styles.emptyState}>
            {composersHaveBeenExpanded ?
              'Your work has been saved. Please select a social account above to continue.' :
              'Please select a social account above to continue.'}
          </div>
        )}

        <NotificationContainer
          visibleNotifications={visibleNotifications}
          scope={NotificationScopes.TWITTER_MAX_ONE_PROFILE_SELECTED}
          classNames={twitterMaxProfileNotificationClassNames}
          onClose={this.onTwitterMaxProfileNotificationClose}
          showCloseIcon
        />

        {isOmniboxEnabled &&
          <ComposerComponent
            {
            ...{
              state: this.state,
              draft: omniDraft,
              profiles,
              isOmniboxEnabled,
              enabledDrafts,
              AppStore,
              visibleNotifications,
              appState,
              draftsSharedData,
              areAllDraftsSaved,
              selectedProfiles,
              shouldEnableFacebookAutocomplete,
              shouldShowInlineSubprofileDropdown,
              composerPosition,
              hasIGDirectFlip,
              hasIGLocationTaggingFeature,
              canStartProTrial,
              isOnProTrial,
              hasIGDirectVideoFlip,
              hasShopgridFlip,
              hasHashtagGroupsFlip,
              hasRestoreComposerDataFlip,
              isFreeUser,
              isBusinessUser,
              draftMode,
            }
            }
          />
        }

        {!isOmniboxEnabled &&
          enabledDrafts.map((draft, index) => (
            <ComposerComponent
              {
              ...{
                state: this.state,
                draft,
                index,
                profiles,
                isOmniboxEnabled,
                enabledDrafts,
                AppStore,
                visibleNotifications,
                appState,
                draftsSharedData,
                areAllDraftsSaved,
                selectedProfiles,
                shouldEnableFacebookAutocomplete,
                shouldShowInlineSubprofileDropdown,
                composerPosition,
                hasIGDirectFlip,
                hasIGLocationTaggingFeature,
                canStartProTrial,
                isOnProTrial,
                hasIGDirectVideoFlip,
                hasShopgridFlip,
                hasHashtagGroupsFlip,
                hasRestoreComposerDataFlip,
                isFreeUser,
                isBusinessUser,
                draftMode,
              }
              }
            />),
          )}
      </div>
    );
  }
}

ComposerSection.propTypes = {
  appState: PropTypes.object.isRequired,
  visibleNotifications: PropTypes.array.isRequired,
  areAllDraftsSaved: PropTypes.bool.isRequired,
  shouldEnableFacebookAutocomplete: PropTypes.bool.isRequired,
  shouldShowInlineSubprofileDropdown: PropTypes.bool.isRequired,
  profiles: PropTypes.array,
  selectedProfiles: PropTypes.array,
  isOmniboxEnabled: PropTypes.bool,
  composerPosition: PropTypes.object,
  hasIGDirectFlip: PropTypes.bool.isRequired,
  hasIGLocationTaggingFeature: PropTypes.bool.isRequired,
  canStartProTrial: PropTypes.bool.isRequired,
  isOnProTrial: PropTypes.bool.isRequired,
  hasIGDirectVideoFlip: PropTypes.bool.isRequired,
  isFreeUser: PropTypes.bool.isRequired,
  hasShopgridFlip: PropTypes.bool,
  hasHashtagGroupsFlip: PropTypes.bool,
  hasRestoreComposerDataFlip: PropTypes.bool,
  isBusinessUser: PropTypes.bool,
  draftMode: PropTypes.bool,
};

ComposerSection.defaultProps = {
  isOmniboxEnabled: null,
  composerPosition: null,
  hasShopgridFlip: false,
  hasHashtagGroupsFlip: false,
  hasRestoreComposerDataFlip: false,
  isBusinessUser: false,
  draftMode: false,
};


export default ComposerSection;
