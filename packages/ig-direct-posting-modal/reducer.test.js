import { actions, actionTypes } from './reducer';

describe('reducer', () => {
  describe('actions', () => {
    it('handleSetUpDirectPostingClick triggers a SET_DIRECT_POSTING action', () => {
      expect(
        actions.handleSetUpDirectPostingClick({ profileId: 'id1' })
      ).toEqual({
        type: actionTypes.SET_DIRECT_POSTING,
        profileId: 'id1',
      });
    });
  });
});
