import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import middleware from './middleware';
import { actionTypes, initialState } from './reducer';

describe('middleware', () => {
  const next = jest.fn();

  it('exports middleware', () => {
    expect(middleware).toBeDefined();
  });

  it('fetches updateStoryGroup when SAVE_NOTE', () => {
    const store = {
      dispatch: jest.fn(),
      getState: () => ({ storyPreview: initialState }),
    };
    const action = {
      type: actionTypes.SAVE_NOTE,
      order: 1,
      note: 'Note1',
    };
    middleware(store)(next)(action);
    expect(next).toBeCalledWith(action);
    expect(store.dispatch).toBeCalledWith(
      dataFetchActions.fetch({
        name: 'updateStoryGroup',
        args: {
          profileId: null,
          storyGroupId: null,
          scheduledAt: null,
          stories: [],
        },
      })
    );
  });
});
