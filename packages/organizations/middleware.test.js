import { actionTypes } from './reducer';
import middleware from './middleware';

describe('middleware', () => {
  const next = jest.fn();
  const dispatch = jest.fn();

  it('should export middleware', () => {
    expect(middleware).toBeDefined();
  });

  it('should pass preserveComposerStateOnClose as true on INITIALIZE', () => {
    const action = {
      type: actionTypes.INITIALIZED,
      organizations: [],
      selectedOrganization: [],
    };

    const expectedObj = {
      organizations: [],
      selected: [],
      preserveComposerStateOnClose: true,
    };

    middleware({ dispatch })(next)(action);
    expect(next).toBeCalledWith(action);

    expect(dispatch).toBeCalledWith({
      type: actionTypes.ORGANIZATION_SELECTED,
      ...expectedObj,
    });
  });
});
