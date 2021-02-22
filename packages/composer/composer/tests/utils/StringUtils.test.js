import {
  removeLinkFromErrorMessageText,
  isUrlOnBlocklist,
} from '../../utils/StringUtils';

describe('StringUtils', () => {
  describe('removeLinkFromErrorMessageText', () => {
    it('removes link by classname from text', () => {
      const messageText = `You've filled the queue for your @hamstu Twitter account, nice work! Upgrading to any paid plan will unlock more space. <a class="embedded-cta-link" href="https://buffer.com/pro" target="_blank">See Paid Plans</a>`;
      const fixedText = removeLinkFromErrorMessageText(
        messageText,
        'embedded-cta-link'
      );
      expect(fixedText).toEqual(
        `You've filled the queue for your @hamstu Twitter account, nice work! Upgrading to any paid plan will unlock more space. `
      );
    });
    it('ignores links that do not match classname', () => {
      const messageText = `You've filled the queue for your @hamstu Twitter account, nice work! Upgrading to any paid plan will unlock more space. <a class="embedded-cta-link" href="https://buffer.com/pro" target="_blank">See Paid Plans</a><a class="embedded-cta-link-diff" href="foo">bar</a>`;
      const fixedText = removeLinkFromErrorMessageText(
        messageText,
        'embedded-cta-link'
      );
      expect(fixedText).toEqual(
        `You've filled the queue for your @hamstu Twitter account, nice work! Upgrading to any paid plan will unlock more space. <a class="embedded-cta-link-diff" href="foo">bar</a>`
      );
    });
    it('noop when string has no links', () => {
      const messageText = `You've filled the queue for your @hamstu Twitter account, nice work! Upgrading to any paid plan will unlock more space.`;
      const fixedText = removeLinkFromErrorMessageText(
        messageText,
        'embedded-cta-link'
      );
      expect(fixedText).toEqual(messageText);
    });
  });

  describe('isUrlOnBlocklist', () => {
    it('blocks urls', () => {
      expect(isUrlOnBlocklist('instagram.com')).toBe(true);
      expect(isUrlOnBlocklist('https://instagram.com')).toBe(true);
      expect(isUrlOnBlocklist('http://instagram.com')).toBe(true);
      expect(isUrlOnBlocklist('instagr.am')).toBe(true);
      expect(isUrlOnBlocklist('facebook.com')).toBe(true);
      expect(isUrlOnBlocklist('https://fb.com')).toBe(true);
      expect(isUrlOnBlocklist('http://fb.me')).toBe(true);
    });
    it('does not block similar urls', () => {
      expect(isUrlOnBlocklist('myinstagram.com')).toBe(false);
      expect(isUrlOnBlocklist('fb.ca')).toBe(false);
      expect(isUrlOnBlocklist('insta-gram.ca')).toBe(false);
    });
  });
});
