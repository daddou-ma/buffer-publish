import { actions, actionTypes } from './reducer';

describe('reducer', () => {
  describe('actions', () => {
    it('upgrade triggers an UPGRADE action', () => {
      const plan = 'free';
      expect(actions.upgrade(plan)).toEqual({
        type: actionTypes.UPGRADE,
        plan,
      });
    });
  });
});
