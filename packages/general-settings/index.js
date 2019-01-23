import { connect } from 'react-redux';
import { actions } from './reducer';
import GeneralSettings from './components/GeneralSettings';
import { WithFeatureLoader } from '@bufferapp/product-features';

export const GeneralSettingsWithFeatureLoader = WithFeatureLoader(GeneralSettings);


export default connect(
    (state, ownProps) => {
      const profileData = state.profileSidebar.profiles.find(p => p.id === ownProps.profileId);
      return {
        isInstagramProfile: profileData.type === 'instagram',
        isInstagramBusiness: state.generalSettings.isInstagramBusiness,
        profileId: state.generalSettings.profileId,
        profileService: state.generalSettings.profileService,
        linkShorteners: state.generalSettings.linkShorteners,
        loadingLinkShorteners: state.generalSettings.loadingLinkShorteners,
        selectedShortener: state.generalSettings.selectedShortener,
        isContributor: state.generalSettings.isContributor,
        showGACustomizationForm: state.generalSettings.showGACustomizationForm,
        googleAnalyticsIsEnabled: state.generalSettings.googleAnalyticsEnabled === 'enabled',
      };
    },
    (dispatch, ownProps) => ({
      onSetUpDirectPostingClick: () => {
        dispatch(actions.handleSetUpDirectPostingClick({
          profileId: ownProps.profileId,
        }));
      },
      onConnectBitlyURLClick: () => {
        dispatch(actions.handleConnectBitlyURLClick({
          profileId: ownProps.profileId,
        }));
      },
      onDisconnectBitlyURLClick: () => {
        dispatch(actions.handleDisconnectBitlyURLClick({
          profileId: ownProps.profileId,
        }));
      },
      onShowGACustomizationFormClick: () => {
        dispatch(actions.handleShowGACustomizationFormClick());
      },
      onLinkShortenerOptionSelect: (event) => {
        dispatch(actions.handleOnSelectLinkShortenerChange({
          profileId: ownProps.profileId,
          domain: event.target.value,
        }));
      },
      onToggleGoogleAnalyticsClick: (googleAnalyticsIsEnabled) => {
        dispatch(actions.handleGoogleAnalyticsToggle({
          profileId: ownProps.profileId,
          utmTrackingChoice: googleAnalyticsIsEnabled ? 'enabled' : 'disabled',
        }));
      },
    }),
)(GeneralSettingsWithFeatureLoader);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
