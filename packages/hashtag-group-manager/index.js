import { connect } from 'react-redux';
import HashtagGroupWrapper from './components/HashtagGroupWrapper';
import { actions } from './reducer';

export default connect(
  state => ({
    hashtagGroups: state.hashtagGroups.groups,
    name: state.hashtagGroups.name,
    text: state.hashtagGroups.text,
    organizationId: state.profileSidebar.selectedProfile.organizationId,
  }),
  (dispatch, ownProps) => ({
    onCancelHashtagGroup: () => {
      dispatch(actions.handleCancelHashtagGroupClick());
    },
    onSaveHashtagGroup: () => {
      dispatch(actions.handleSaveHashtagGroupClick());
    },
    onDeleteHashtagGroup: (name, text, groupId) => {
      dispatch(
        actions.handleDeleteHashtagGroup({
          name,
          text,
          groupId,
        })
      );
    },
    onChangeGroupName: name => {
      dispatch(
        actions.handleChangeGroupName({
          name,
        })
      );
    },
    onChangeGroupText: text => {
      dispatch(
        actions.handleChangeGroupText({
          text,
        })
      );
    },
    onHandleInsertHashtagGroupClick: (name, text) => {
      if (ownProps.onInsertHashtagGroupClick) {
        ownProps.onInsertHashtagGroupClick(text);
      }
      dispatch(actions.handleInsertHashtagGroupClick({ name, text }));
    },
  })
)(HashtagGroupWrapper);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
