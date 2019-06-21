import countHashtagsInText from '../../../lib/validation/HashtagCounter';

describe('countHashtagsInText', () => {
  describe('there are not any hashtags', () => {
    it('returns 0 if there are none', () => {
      const text = 'text without hashtags';
      expect(countHashtagsInText(text)).toBe(0);
    });
  });

  describe('there are hashtags', () => {
    it('returns number of simple hashtags', () => {
      const text = 'test #one #two #three test';
      expect(countHashtagsInText(text)).toBe(3);
    });

    it('returns number of hashtags together', () => {
      const text = 'test #one#two#three #four test';
      expect(countHashtagsInText(text)).toBe(4);
    });

    it('returns number of hashtags with emojis', () => {
      const text = 'test #one#two #three #four #🙂 #🏯 test';
      expect(countHashtagsInText(text)).toBe(6);
    });

    it('returns number of hashtags with UTF8 characters', () => {
      const text = 'test #one #two #árbol #cayó';
      expect(countHashtagsInText(text)).toBe(4);
    });

    it('returns number of hashtags with UTF8 characters together', () => {
      const text = 'test #one#two#árbol#cayó';
      expect(countHashtagsInText(text)).toBe(4);
    });
  });
});
