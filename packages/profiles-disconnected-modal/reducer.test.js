import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

import reducer, { actions, actionTypes } from './reducer';

const profilesWithTwoDisconnected = [
  { id: '1', isDisconnected: true, reconnecting: false },
  { id: '2', isDisconnected: true, reconnecting: false },
  { id: '3', isDisconnected: false, reconnecting: false },
];

const profilesWithNoDisconnected = [
  { id: '1', isDisconnected: false, reconnecting: false },
  { id: '2', isDisconnected: false, reconnecting: false },
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

  describe('actions creators', () => {
    expect(actions.reconnectProfile({ id: 'id', service: 'service' })).toEqual({
      type: actionTypes.RECONNECT_PROFILE,
      id: 'id',
      service: 'service',
    });
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
    it('sets the profile reconnecting state', () => {
      const someDisconnectedProfiles = [
        { id: '1', isDisconnected: true, reconnecting: false },
        { id: '2', isDisconnected: true, reconnecting: false },
      ];
      state = reducer(
        { disconnectedProfiles: someDisconnectedProfiles },
        {
          type: actionTypes.RECONNECT_PROFILE,
          id: '1',
          service: 'twitter',
        }
      );
      const someDisconnectedProfilesReconnecting = [
        { id: '1', isDisconnected: true, reconnecting: true },
        { id: '2', isDisconnected: true, reconnecting: false },
      ];
      expect(state.disconnectedProfiles).toEqual(
        someDisconnectedProfilesReconnecting
      );
    });
  });
});
