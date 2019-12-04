import middleware from './middleware';

describe('middleware', () => {
  beforeEach(() => {
    global.console.group = jest.fn();
    global.console.log = jest.fn();
    global.console.groupEnd = jest.fn();
  });
  it('should handle action', () => {
    const next = jest.fn();
    const action = {
      type: 'type',
    };
    middleware(undefined)(next)(action);
    expect(next).toBeCalledWith(action);
    expect(global.console.group).toHaveBeenCalled();
    expect(global.console.log).toHaveBeenCalledWith('action', action);
    expect(global.console.groupEnd).toHaveBeenCalled();
  });
  afterEach(() => {
    global.console.group.mockRestore();
    global.console.log.mockRestore();
    global.console.groupEnd.mockRestore();
  });
});
