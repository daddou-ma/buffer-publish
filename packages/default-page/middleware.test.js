import middleware from './middleware';

describe('middleware', () => {
  const dispatch = jest.fn();
  const next = jest.fn();
  it('should export middleware', () => {
    expect(middleware).toBeDefined();
  });
  it('should ignore irrelevant actions', () => {
    const action = {
      type: 'foo',
    };
    middleware({ dispatch })(next)(action);
    expect(next).toBeCalledWith(action);
  });
});
