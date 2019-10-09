import getAspectRatio from './aspectRatioFinder';

describe('aspectRatioFinder', () => {
  it('has getAspectRatio', () => {
    expect(getAspectRatio).toBeDefined();
    expect(typeof getAspectRatio).toBe('function');
  });

  it('converts aspect ratio correctly for 1920, 1080 to 16:9', () => {
    expect(getAspectRatio({ width: 1920, height: 1080 })).toBe('16:9');
  });

  it('converts aspect ratio correctly for 1080, 1920 to 9:16', () => {
    expect(getAspectRatio({ width: 1080, height: 1920 })).toBe('9:16');
  });

  it('converts aspect ratio correctly for 100, 100 to 1:1', () => {
    expect(getAspectRatio({ width: 100, height: 100 })).toBe('1:1');
  });

  it('converts aspect ratio correctly for undefined, undefined to 1:1', () => {
    expect(getAspectRatio()).toBe('1:1');
  });

  it('converts aspect ratio correctly for 1, undefined to 1:1', () => {
    expect(getAspectRatio({ width: 1 })).toBe('1:1');
  });
});
