import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { WithFeatureLoader } from '@bufferapp/product-features';
import { generateProfilePageRoute } from '@bufferapp/publish-routes';
import { actions as queueActions } from '@bufferapp/publish-queue';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actions } from './reducer';
import GeneralSettings from './components/GeneralSettings';

export const GeneralSettingsWithFeatureLoader = WithFeatureLoader(GeneralSettings);


export default connect(
    state => ({
      isInstagramProfile: state.generalSettings.isInstagramProfile,
      isInstagramBusiness: state.generalSettings.isInstagramBusiness,
      profileId: state.generalSettings.profileId,
      profileService: state.generalSettings.profileService,
      linkShorteners: state.generalSettings.linkShorteners,
      loadingLinkShorteners: state.generalSettings.loadingLinkShorteners,
      selectedShortener: state.generalSettings.selectedShortener,
      isContributor: state.generalSettings.isContributor,
      showGACustomizationForm: state.generalSettings.showGACustomizationForm,
      googleAnalyticsIsEnabled: state.generalSettings.googleAnalyticsEnabled === 'enabled',
      hasInstagramFeatureFlip: state.appSidebar.user.features ? state.appSidebar.user.features.includes('new_ig_authentication') : false,
    }),
    (dispatch, ownProps) => ({
      onSetUpDirectPostingClick: () => {
        dispatch(actions.handleSetUpDirectPostingClick({
          profileId: ownProps.profileId,
        }));
      },
      onDirectPostingClick: () => {
        dispatch(push(generateProfilePageRoute({
          profileId: ownProps.profileId,
          tabId: 'queue',
        })));
        dispatch(dataFetchActions.fetch({
          name: 'checkInstagramBusiness',
          args: {
            profileId: ownProps.profileId,
            callbackAction: queueActions.handleOpenInstagramModal({
              profileId: ownProps.profileId,
            }),
          },
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
