import {
  storyPropTypes,
  userPropTypes,
  translationsPropTypes,
} from './commonPropTypes';

describe('commonPropTypes', () => {
  it('has storyPropTypes', () => {
    expect(storyPropTypes).toBeDefined();
    expect(typeof storyPropTypes).toBe('function');
  });

  it('has userPropTypes', () => {
    expect(userPropTypes).toBeDefined();
    expect(typeof userPropTypes).toBe('function');
  });

  it('has translationsPropTypes', () => {
    expect(translationsPropTypes).toBeDefined();
    expect(typeof translationsPropTypes).toBe('function');
  });
});
