import { SEGMENT_NAMES } from '@bufferapp/publish-constants';
import getURL from './getURL';

describe('getURL', () => {
  const { IG_FIRST_COMMENT_PRO_TRIAL } = SEGMENT_NAMES;

  describe('getBillingURL', () => {
    it('should include cta param', () => {
      const result = getURL.getBillingURL({ cta: IG_FIRST_COMMENT_PRO_TRIAL });
      expect(result).toEqual(
        `https://${getURL.getBaseURL()}/app/account/receipts?content_only=true&cta=${IG_FIRST_COMMENT_PRO_TRIAL}`
      );
    });
    it('should not include cta param', () => {
      const result = getURL.getBillingURL({});
      expect(result).toEqual(
        `https://${getURL.getBaseURL()}/app/account/receipts?content_only=true`
      );
    });
  });

  describe('getStartTrialURL', () => {
    it('should include cta', () => {
      const result = getURL.getStartTrialURL({
        cta: IG_FIRST_COMMENT_PRO_TRIAL,
        trialType: 'pro',
      });
      expect(result).toEqual(
        `https://${getURL.getBaseURL()}/billing/start-trial?trialType=pro&cta=${IG_FIRST_COMMENT_PRO_TRIAL}`
      );
    });
    // it('should not include cta', () => {
    //   const result = getURL.getStartTrialURL({
    //     trialType: 'pro',
    //   });
    //   expect(result).toEqual(`https://${getURL.getBaseURL()}/billing/start-trial?trialType=pro`);
    // });
  });
});
