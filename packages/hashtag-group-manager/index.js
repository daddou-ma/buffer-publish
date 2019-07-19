import { connect } from 'react-redux';
import HashtagGroupWrapper from './components/HashtagGroupWrapper';
import { actions } from './reducer';

export default connect(
  state => ({
    hashtagGroups: state.hashtagGroups.groups,
  }),
  dispatch => ({
    onCancelHashtagGroup: () => {
      dispatch(actions.handleCancelHashtagGroupClick());
    },
    onSaveHashtagGroup: () => {
      dispatch(actions.handleSaveHashtagGroupClick());
    },
  }),
)(HashtagGroupWrapper);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
