import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import middleware from './middleware';
import { actionTypes } from './reducer';

describe('middleware', () => {
  const next = jest.fn();
  const dispatch = jest.fn();
  it('should export middleware', () => {
    expect(middleware).toBeDefined();
  });

  it('should fetch sentPosts', () => {
    const action = {
      type: actionTypes.FETCH_SENT_POSTS,
      profileId: 'id1',
    };
    middleware({ dispatch })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      dataFetchActions.fetch({
        name: 'sentPosts',
        args: {
          profileId: action.profileId,
          isFetchingMore: false,
        },
      })
    );
  });
});
