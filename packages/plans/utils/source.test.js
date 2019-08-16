import getSource from './source';

describe('Plans Utils', () => {
  describe('returns correct source', () => {
    it('returns pro upgrade source', () => {
      const source = getSource('pro', 'free');
      expect(source).toEqual('plans-pro-upgrade');
    });
    it('returns pro downgrade source', () => {
      const source = getSource('pro', 'small');
      expect(source).toEqual('plans-pro-downgrade');
    });
    it('returns premium upgrade source', () => {
      const source = getSource('pro', 'premium');
      expect(source).toEqual('plans-premium-upgrade');
    });
  });
});
