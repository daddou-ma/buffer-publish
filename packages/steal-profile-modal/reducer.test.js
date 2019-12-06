import deepFreeze from 'deep-freeze';
import { actionTypes as modalsActionTypes } from '@bufferapp/publish-modals';
import reducer from './reducer';

describe('reducer', () => {
  it('should initialize default state', () => {
    const stateAfter = {
      showStealProfileModal: false,
    };
    const action = {
      type: 'INIT',
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should handle SHOW_STEAL_PROFILE_MODAL action type', () => {
    const stateAfter = {
      showStealProfileModal: true,
    };
    const action = {
      type: modalsActionTypes.SHOW_STEAL_PROFILE_MODAL,
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should handle HIDE_STEAL_PROFILE_MODAL actionType', () => {
    const stateBefore = {
      showStealProfileModal: true,
    };
    const stateAfter = {
      showStealProfileModal: false,
    };
    const action = {
      type: modalsActionTypes.HIDE_STEAL_PROFILE_MODAL,
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});
