import reducer, { initialState, actions } from './reducer';

describe('reducer', () => {
  it('should return initial state', () => {
    const action = { type: 'INIT' };
    expect(reducer(undefined, action))
      .toEqual(initialState);
  });

  describe('actions', () => {
    it('should show welcome modal', () => {
      expect(reducer(initialState, actions.showWelcomeModal()))
        .toEqual(Object.assign(initialState, { showWelcomeModal: true }));
    });
    it('should hide welcome modal', () => {
      const stateWithVisibleModal = Object.assign(
        initialState,
        { showWelcomeModal: true },
      );
      expect(reducer(stateWithVisibleModal, actions.hideWelcomeModal()))
        .toEqual(Object.assign(initialState, { showWelcomeModal: false }));
    });
    it('should show upgrade modal', () => {
      expect(reducer(initialState, actions.showUpgradeModal({ source: 'foo' })))
        .toEqual(Object.assign(initialState, { showUpgradeModal: true, upgradeModalSource: 'foo' }));
    });
    it('should hide upgrade modal', () => {
      const stateWithVisibleModal = Object.assign(
        initialState,
        { showUpgradeModal: true, upgradeModalSource: 'foo' },
      );
      expect(reducer(stateWithVisibleModal, actions.hideUpgradeModal()))
        .toEqual(Object.assign(initialState, { showUpgradeModal: false, upgradeModalSource: 'foo' }));
    });
  });
});
