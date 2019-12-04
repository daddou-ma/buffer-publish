import deepFreeze from 'deep-freeze';
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar/reducer';
import reducer, { actions, initialState, actionTypes } from './reducer';

describe('reducer', () => {
  // Tests the default case in the reducer switch statement
  it('should initialize default state', () => {
    const action = {
      type: '',
    };
    // Protects state and actions from mutation
    deepFreeze(initialState);
    deepFreeze(action);

    // When state is undefined, it's supposed to return initial state
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  it('should handle SELECT_PROFILE action type', () => {
    const stateBefore = {
      ...initialState,
      user: {},
    };
    const stateAfter = {
      ...initialState,
      user: {
        avatarUrl: 'url',
        handle: 'user1',
      },
    };
    const action = {
      type: profileActionTypes.SELECT_PROFILE,
      profile: {
        avatarUrl: 'url',
        username: 'user1',
      },
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle OPEN_PREVIEW action type', () => {
    const stateBefore = {
      ...initialState,
      user: {},
    };
    const stateAfter = {
      ...initialState,
      stories: [],
      profileId: 'id1',
      storyGroupId: 'id2',
      scheduledAt: null,
    };
    const action = {
      type: actionTypes.OPEN_PREVIEW,
      stories: [],
      profileId: 'id1',
      id: 'id2',
      scheduledAt: null,
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  // Test action creators:
  describe('action creators', () => {
    it('should create an OPEN_PREVIEW action', () => {
      const params = {
        stories: [],
        profileId: 'id1',
        id: 'id2',
        scheduledAt: null,
      };
      const expectedAction = {
        type: actionTypes.OPEN_PREVIEW,
        stories: [],
        profileId: 'id1',
        id: 'id2',
        scheduledAt: null,
      };
      expect(actions.handlePreviewClick(params)).toEqual(expectedAction);
    });

    it('should create a SAVE_NOTE action', () => {
      const params = {
        order: 1,
        note: 'Note1',
      };
      const expectedAction = {
        type: actionTypes.SAVE_NOTE,
        order: 1,
        note: 'Note1',
      };
      expect(actions.handleSaveNoteClick(params)).toEqual(expectedAction);
    });

    it('should create a SAVE_NOTE_COMPOSER action', () => {
      const params = {
        order: 1,
        note: 'Note1',
      };
      const expectedAction = {
        type: actionTypes.SAVE_NOTE_COMPOSER,
        order: 1,
        note: 'Note1',
      };
      expect(actions.handleSaveNoteComposer(params)).toEqual(expectedAction);
    });
  });
});
