import {
  selectedProfilePropTypes,
  translationsPropTypes,
  carouselCardPropTypes,
  storyGroupPropTypes,
} from './commonPropTypes';

describe('commonPropTypes', () => {
  it('has selectedProfilePropTypes', () => {
    expect(selectedProfilePropTypes).toBeDefined();
    expect(typeof selectedProfilePropTypes).toBe('function');
  });

  it('has translationsPropTypes', () => {
    expect(translationsPropTypes).toBeDefined();
    expect(typeof translationsPropTypes).toBe('function');
  });

  it('has carouselCardPropTypes', () => {
    expect(carouselCardPropTypes).toBeDefined();
    expect(typeof carouselCardPropTypes).toBe('function');
  });

  it('has storyGroupPropTypes', () => {
    expect(storyGroupPropTypes).toBeDefined();
    expect(typeof storyGroupPropTypes).toBe('function');
  });
});
