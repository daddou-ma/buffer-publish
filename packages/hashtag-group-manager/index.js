import { connect } from 'react-redux';
import HashtagGroupWrapper from './components/HashtagGroupWrapper';
import { actions } from './reducer';

export default connect(
  state => ({
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

export { actions, actionTypes } from './reducer';
export middleware from './middleware';
