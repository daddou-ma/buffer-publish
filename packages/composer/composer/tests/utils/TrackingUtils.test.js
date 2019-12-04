import { getComposerSource } from '../../utils/TrackingUtils';

describe('Tracking Utils', () => {
  describe('returns correct source', () => {
    it('returns queue list', () => {
      const source = getComposerSource({ tabId: 'queue', emptySlotMode: true });
      expect(source).toEqual('queue_list');
    });
    it('returns queue', () => {
      const source = getComposerSource({
        tabId: 'queue',
        emptySlotMode: false,
      });
      expect(source).toEqual('queue');
    });
    it('returns share_again', () => {
      const source = getComposerSource({ tabId: 'analytics' });
      expect(source).toEqual('share_again');
    });
    it('returns source name if no match', () => {
      const source = getComposerSource({ tabId: 'foobar' });
      expect(source).toEqual('foobar');
    });
  });
});
