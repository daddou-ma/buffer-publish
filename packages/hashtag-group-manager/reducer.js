import keyWrapper from '@bufferapp/keywrapper';
import {
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('HASHTAG_GROUP_MANAGER', {
  CANCEL_HASHTAG_GROUP: 0,
  SAVE_HASHTAG_GROUP: 0,
  DELETE_HASHTAG_GROUP: 0,
  INSERT_HASHTAG_GROUP: 0,
  ON_CHANGE_HASHTAG_GROUP_NAME: 0,
  ON_CHANGE_HASHTAG_GROUP_TEXT: 0,
});

export const initialState = {
  name: '',
  text: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `getHashtagGroups_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        groups: action.result.data.snippets,
      };
    case actionTypes.ON_CHANGE_HASHTAG_GROUP_NAME:
      return {
        ...state,
        name: action.name,
      };
    case `createHashtagGroup_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        groups: action.result.data.snippets,
        name: '',
        text: '',
      };
    case actionTypes.ON_CHANGE_HASHTAG_GROUP_TEXT:
      return {
        ...state,
        text: action.text,
      };
    case actionTypes.CANCEL_HASHTAG_GROUP:
      return {
        ...state,
        name: '',
        text: '',
      };
    case actionTypes.DELETE_HASHTAG_GROUP:
      return {
        ...state,
        groups: state.groups.filter(group => group._id !== action.groupId),
      };
    default:
      return state;
  }
};


export const actions = {
  handleCancelHashtagGroupClick: () => ({
    type: actionTypes.CANCEL_HASHTAG_GROUP,
  }),
  handleSaveHashtagGroupClick: () => ({
    type: actionTypes.SAVE_HASHTAG_GROUP,
  }),
  handleInsertHashtagGroupClick: () => ({
    type: actionTypes.INSERT_HASHTAG_GROUP,
  }),
  handleDeleteHashtagGroup: ({ groupId }) => ({
    type: actionTypes.DELETE_HASHTAG_GROUP,
    groupId,
  }),
  handleChangeGroupName: ({ name }) => ({
    type: actionTypes.ON_CHANGE_HASHTAG_GROUP_NAME,
    name,
  }),
  handleChangeGroupText: ({ text }) => ({
    type: actionTypes.ON_CHANGE_HASHTAG_GROUP_TEXT,
    text,
  }),
};
