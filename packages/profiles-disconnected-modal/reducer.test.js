import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

import reducer from './reducer';

const profilesWithTwoDisconnected = [
  { id: '1', isDisconnected: true },
  { id: '2', isDisconnected: true },
  { id: '3', isDisconnected: false },
];

const profilesWithNoDisconnected = [
  { id: '1', isDisconnected: false },
  { id: '2', isDisconnected: false },
];

describe('reducer', () => {
  let state = {};

  describe('initial state', () => {
    beforeEach(() => {
      state = reducer(undefined, {
        type: 'INIT',
      });
    });
    it('has empty list of disconnected profiles', () =>
      expect(state.disconnectedProfiles).toEqual([]));
  });

  describe('actions', () => {
    it('collects the disconnected profiles when profiles are loaded', () => {
      state = reducer(undefined, {
        type: `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`,
        result: profilesWithTwoDisconnected,
      });
      expect(state.disconnectedProfiles).toEqual([
        profilesWithTwoDisconnected[0],
        profilesWithTwoDisconnected[1],
      ]);
    });
    it('does nothing when no profiles are disconnected', () => {
      state = reducer(undefined, {
        type: `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`,
        result: profilesWithNoDisconnected,
      });
      expect(state.disconnectedProfiles).toEqual([]);
    });
  });
});
