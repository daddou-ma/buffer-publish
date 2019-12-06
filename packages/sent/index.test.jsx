import reducer, { actions, actionTypes } from './reducer';
import middleware from './middleware';

describe('Sent', () => {
  it('should export reducer', () => {
    expect(reducer).toBeDefined();
  });

  it('should export actions', () => {
    expect(actions).toBeDefined();
  });

  it('should export actionTypes', () => {
    expect(actionTypes).toBeDefined();
  });

  it('should export middleware', () => {
    expect(middleware).toBeDefined();
  });
});
