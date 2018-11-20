import { connect } from 'react-redux';
import { actions } from './reducer';
import GeneralSettings from './components/GeneralSettings';
import { WithFeatureLoader } from '@bufferapp/product-features';

export const GeneralSettingsWithFeatureLoader = WithFeatureLoader(GeneralSettings);


export default connect(
    state => ({
      directPostingEnabled: state.generalSettings.directPostingEnabled,
      profileId: state.generalSettings.profileId,
      profileService: state.generalSettings.profileService,
      linkShorteners: state.generalSettings.linkShorteners,
      loadingLinkShorteners: state.generalSettings.loadingLinkShorteners,
      selectedShortener: state.generalSettings.selectedShortener,
      isContributor: state.generalSettings.isContributor,
    }),
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
      onLinkShortenerOptionSelect: (event) => {
        dispatch(actions.handleOnSelectLinkShortenerChange({
          profileId: ownProps.profileId,
          domain: event.target.value,
        }));
      },
    }),
)(GeneralSettingsWithFeatureLoader);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
