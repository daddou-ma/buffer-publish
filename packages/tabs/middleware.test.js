import { push } from 'connected-react-router';
import { generateProfilePageRoute } from '@bufferapp/publish-routes';
import middleware from './middleware';
import { actionTypes } from './reducer';

describe('middleware', () => {
  it('exports middleware', () => {
    expect(middleware).toBeDefined();
  });

  it('navigates to generateProfilePageRoute when SELECT_TAB', () => {
    const fakeState = () => ({
      tabId: 'queue',
      profileId: 'id',
    });
    const dispatch = jest.fn();
    const next = jest.fn();

    const action = {
      type: actionTypes.SELECT_TAB,
      tabId: 'drafts',
      profileId: 'id',
    };

    middleware({ dispatch, getState: fakeState })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      push(
        generateProfilePageRoute({
          profileId: 'id',
          tabId: 'drafts',
        })
      )
    );
  });
});
