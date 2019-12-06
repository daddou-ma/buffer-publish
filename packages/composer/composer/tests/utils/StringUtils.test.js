import { removeLinkFromErrorMessageText } from '../../utils/StringUtils';

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
});
