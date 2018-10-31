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
      googleAnalyticsIsEnabled: state.generalSettings.googleAnalyticsIsEnabled,
      // This should be removed once the Google Analytics feature is complete - Lola, Nov 2018
      workInProgress: true,
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
      onShowGACustomizationFormClick: () => {
        dispatch(actions.handleShowGACustomizationFormClick());
      },
      onToggleGoogleAnalyticsClick: () => {
        dispatch(actions.handleGoogleAnalyticsToggle());
      },
    }),
)(GeneralSettings);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
