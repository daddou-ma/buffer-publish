import { SEGMENT_NAMES } from '@bufferapp/publish-constants';
import getCtaFromSource from './tracking';

describe('Switch Plan Tracking Utils', () => {
  it('returns segment name that matches source', () => {
    expect(getCtaFromSource('app_shell')).toEqual(SEGMENT_NAMES.APP_SHELL_PRO_UPGRADE);
  });
  it('returns null if there is no segment name that matches source', () => {
    expect(getCtaFromSource('hello')).toEqual(null);
  });
});
