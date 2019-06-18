import countHashtagsInText from '../../../lib/validation/HashtagCounter';

describe('countHashtagsInText', () => {
  describe('there are not any hashtags', () => {
    it('returns 0 if there are none', () => {
      expect(countHashtagsInText('text without hashtags')).toBe(0);
    });
  });

  describe('there are hashtags', () => {
    it('returns number of hashtags if there are none', () => {
      expect(countHashtagsInText('text without hashtags')).toBe(0);
    });
  });
});
