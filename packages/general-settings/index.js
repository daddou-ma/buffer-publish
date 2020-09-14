import { connect } from 'react-redux';
import { WithFeatureLoader } from '@bufferapp/product-features';
import { profileTabPages } from '@bufferapp/publish-routes';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { actions } from './reducer';
import GeneralSettings from './components/GeneralSettings';

export const GeneralSettingsWithFeatureLoader = WithFeatureLoader(
  GeneralSettings
);

export default connect(
  state => ({
    isInstagramProfile: state.generalSettings.isInstagramProfile,
    isInstagramBusiness: state.generalSettings.isInstagramBusiness,
    profileId: state.generalSettings.profileId,
    profileService: state.generalSettings.profileService,
    profileName: state.generalSettings.profileName,
    avatarUrl: state.generalSettings.avatarUrl,
    isManager: state.profileSidebar.selectedProfile.isManager,
    showGACustomizationForm: state.generalSettings.showGACustomizationForm,
    googleAnalyticsIsEnabled:
      state.generalSettings.googleAnalyticsEnabled === 'enabled',
    utmCampaign: state.generalSettings.utmCampaign,
    utmSource: state.generalSettings.utmSource,
    utmMedium: state.generalSettings.utmMedium,
    remindersAreEnabled: state.generalSettings.remindersAreEnabled,
    isLockedProfile: state.profileSidebar.isLockedProfile,
    isDisconnectedProfile: state.profileSidebar.selectedProfile.isDisconnected,
    showModal: state.generalSettings.showModal,
    loadingShuffle: state.generalSettings.loadingShuffle,
    linkShortening: state.generalSettings.linkShortening,
    linkShorteningEnabled: state.generalSettings.linkShorteningEnabled,
    hasCustomizingUtmParamsFeature:
      state.organizations.selected.hasCustomizingUtmParamsFeature,
    hasBitlyFeature: state.organizations.selected.hasBitlyFeature,
  }),
  (dispatch, ownProps) => ({
    onDirectPostingClick: () => {
      dispatch(
        profileTabPages.goTo({ profileId: ownProps.profileId, tabId: 'queue' })
      );
      dispatch(
        dataFetchActions.fetch({
          name: 'checkInstagramBusiness',
          args: {
            profileId: ownProps.profileId,
            callbackAction: modalsActions.showInstagramDirectPostingModal({
              profileId: ownProps.profileId,
            }),
          },
        })
      );
    },
    onConnectBitlyURLClick: () => {
      dispatch(
        actions.handleConnectBitlyURLClick({
          profileId: ownProps.profileId,
        })
      );
    },
    onDisconnectBitlyURLClick: () => {
      dispatch(
        actions.handleDisconnectBitlyURLClick({
          profileId: ownProps.profileId,
        })
      );
    },
    onShowGACustomizationFormClick: () => {
      dispatch(
        actions.handleShowGACustomizationFormClick({
          profileId: ownProps.profileId,
        })
      );
    },
    onLinkShortenerOptionSelect: event => {
      dispatch(
        actions.handleOnSelectLinkShortenerChange({
          profileId: ownProps.profileId,
          domain: event.target.value,
        })
      );
    },
    onToggleGoogleAnalyticsClick: (
      googleAnalyticsIsEnabled,
      linkShorteningEnabled
    ) => {
      if (linkShorteningEnabled) {
        dispatch(
          actions.handleGoogleAnalyticsToggle({
            profileId: ownProps.profileId,
            utmTrackingChoice: googleAnalyticsIsEnabled
              ? 'enabled'
              : 'disabled',
          })
        );
      }
    },
    onSaveGATrackingSettingsClick: (utmCampaign, utmSource, utmMedium) => {
      dispatch(
        actions.handleSaveGATrackingSettings({
          profileId: ownProps.profileId,
          utmCampaign,
          utmSource,
          utmMedium,
        })
      );
    },
    onChangeUtmCampaign: event => {
      dispatch(
        actions.handleChangeUtmCampaign({
          utmCampaign: event.target.value,
        })
      );
    },
    onChangeUtmSource: event => {
      dispatch(
        actions.handleChangeUtmSource({
          utmSource: event.target.value,
        })
      );
    },
    onChangeUtmMedium: event => {
      dispatch(
        actions.handleChangeUtmMedium({
          utmMedium: event.target.value,
        })
      );
    },
    onToggleRemindersClick: newToggleValue => {
      dispatch(
        actions.handleRemindersToggle({
          profileId: ownProps.profileId,
          allowReminders: newToggleValue,
        })
      );
    },
    onShuffleQueueClick: () => {
      dispatch(actions.handleShuffleQueue());
    },
    onConfirmShuffleQueueClick: () => {
      dispatch(
        actions.handleConfirmShuffleClick({ profileId: ownProps.profileId })
      );
    },
    onCloseModal: () => {
      dispatch(actions.handleCloseModal());
    },
  })
)(GeneralSettingsWithFeatureLoader);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
