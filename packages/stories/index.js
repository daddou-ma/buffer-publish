import { connect } from 'react-redux';

import { actions } from './reducer';
import StoriesPosts from './components/StoriesPosts';
import storiesPosts from './components/StoriesPosts/storiesData';
import formatPostLists from './util';

export default connect(
  (state, ownProps) => {
    const { profileId } = ownProps;
    const currentProfile = state.stories.byProfileId[profileId];
    if (currentProfile) {
      return {
        loading: currentProfile.loading,
        loadingMore: currentProfile.loadingMore,
        moreToLoad: currentProfile.moreToLoad,
        page: currentProfile.page,
        storiesPosts: formatPostLists({
          posts: storiesPosts,
        }),
        showStoriesComposer: state.stories.showStoriesComposer,
        editMode: state.stories.editMode,
      };
    }
    return {};
  },
  (dispatch, ownProps) => ({
    onEmptySlotClick: (post) => {
      dispatch(actions.handleEmptySlotClick({
        emptySlotData: post,
        profileId: ownProps.profileId,
      }));
    },
    onComposerPlaceholderClick: () => {
      dispatch(actions.handleComposerPlaceholderClick());
    },
  }),
)(StoriesPosts);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
