import { connect } from 'react-redux';
import { actions } from './reducer';
import GeneralSettings from './components/GeneralSettings';

export default connect(
    state => ({
      directPostingEnabled: state.generalSettings.directPostingEnabled,
      profileId: state.generalSettings.profileId,
      profileService: state.generalSettings.profileService,
      linkShorteners: state.generalSettings.linkShorteners,
      loadingLinkShorteners: state.generalSettings.loadingLinkShorteners,
      selectedShortener: state.generalSettings.selectedShortener,
      showGACustomizationForm: state.generalSettings.showGACustomizationForm,
      googleAnalyticsIsEnabled: state.generalSettings.googleAnalyticsEnabled === 'enabled',
    }),
    (dispatch, ownProps) => ({
      onSetUpDirectPostingClick: () => {
        dispatch(actions.handleSetUpDirectPostingClick({
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
)(GeneralSettings);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
