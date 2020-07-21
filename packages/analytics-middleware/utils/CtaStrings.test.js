import { SEGMENT_NAMES } from '@bufferapp/publish-constants';
import getCtaProperties from './CtaStrings';

describe('CtaStrings Utils', () => {
  describe('returns correct cta properties', () => {
    it('returns app shell pro trial cta properties', () => {
      const expectedProperties = {
        cta: SEGMENT_NAMES.HEADER_PRO_TRIAL,
        ctaApp: 'publish',
        ctaView: 'app',
        ctaLocation: 'header',
        ctaButton: 'proTrial',
        ctaVersion: '1',
      };
      const properties = getCtaProperties(SEGMENT_NAMES.HEADER_PRO_TRIAL);
      expect(properties).toEqual(expectedProperties);
    });
    it('returns only cta if cta string doesnt meet validation', () => {
      const properties = getCtaProperties('invalid-cta-string');
      expect(properties).toEqual({ cta: 'invalid-cta-string' });
    });
    it('returns cta as null if undefined', () => {
      const properties = getCtaProperties(undefined);
      expect(properties).toEqual({ cta: null });
    });
  });
});
