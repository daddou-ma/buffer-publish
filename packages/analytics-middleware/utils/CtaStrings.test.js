import { PLANS_OPEN_MODAL } from '@bufferapp/publish-constants';
import getCtaProperties from './CtaStrings';

describe('CtaStrings Utils', () => {
  describe('returns correct cta properties', () => {
    it('returns plans open modal cta properties', () => {
      const expectedProperties = {
        cta: PLANS_OPEN_MODAL,
        ctaApp: 'publish',
        ctaView: 'plans',
        ctaLocation: 'subscribeButton',
        ctaButton: 'openSwithPlansModal',
        ctaVersion: 1,
      };
      const properties = getCtaProperties(PLANS_OPEN_MODAL);
      expect(properties).toEqual(expectedProperties);
    });
    it('returns cta only if cta string doesnt meet validation', () => {
      const properties = getCtaProperties('invalid-cta-string');
      expect(properties).toEqual({ cta: 'invalid-cta-string' });
    });
  });
});
