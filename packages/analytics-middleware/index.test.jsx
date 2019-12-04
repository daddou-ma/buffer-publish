import { middleware, actionTypes, actions } from './index';

describe('DemographicStore', () => {
  it('should export middleware', () => {
    expect(middleware).toBeDefined();
  });
  it('should export actionTypes', () => {
    expect(actionTypes).toBeDefined();
  });
  it('should export action', () => {
    expect(actions).toBeDefined();
  });
});
