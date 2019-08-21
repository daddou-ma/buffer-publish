import { connect } from 'react-redux';

import StoriesPosts from './components/StoriesPosts';
import { actions } from './reducer';
import storiesPosts from './components/StoriesPosts/storiesData';

export default connect(
  (state, ownProps) => {
    const { profileId } = ownProps;
    const currentProfile = state.stories.byProfileId[profileId];
    if (currentProfile) {
      return {
        loading: currentProfile.loading,
        page: currentProfile.page,
        storiesPosts,
      };
    }
  },
  (dispatch, ownProps) => ({
    onSlotClick: () => {
      dispatch(actions.handleSlotClick({
        profileId: ownProps.profileId,
      }));
    },
  }),
)(StoriesPosts);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
