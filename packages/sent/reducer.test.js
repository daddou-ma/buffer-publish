import deepFreeze from 'deep-freeze';
import reducer, {
  initialState,
  profileInitialState,
  actionTypes,
} from './reducer';

const profileId = '123456';

describe('Sent | reducer', () => {
  it('should initialize default state', () => {
    const stateAfter = initialState;
    const action = {
      type: 'INIT',
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should handle sentPosts_FETCH_START action type', () => {
    const stateAfter = {
      ...initialState,
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          posts: {},
          total: 0,
        },
      },
    };
    const action = {
      profileId,
      type: 'sentPosts_FETCH_START',
      args: {
        isFetchingMore: false,
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should handle sentPosts_FETCH_SUCCESS action type', () => {
    const post = { id: 'foo', text: 'i love buffer' };
    const stateAfter = {
      ...initialState,
      byProfileId: {
        [profileId]: {
          hasBitlyPosts: false,
          loading: false,
          loadingMore: false,
          moreToLoad: false,
          page: 2,
          posts: [post],
          total: 1,
        },
      },
    };
    const action = {
      profileId,
      type: 'sentPosts_FETCH_SUCCESS',
      result: {
        updates: [post],
        total: 1,
      },
      args: {
        isFetchingMore: false,
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should handle sentPosts_FETCH_FAIL action type', () => {
    const stateAfter = {
      ...initialState,
      byProfileId: {
        [profileId]: {
          loading: false,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          posts: {},
          total: 0,
        },
      },
    };
    const action = {
      profileId,
      type: 'sentPosts_FETCH_FAIL',
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should handle OPEN_COMPOSER action type', () => {
    const stateComposerHidden = Object.assign(initialState, {
      showComposer: false,
    });

    const action = {
      profileId,
      type: 'OPEN_COMPOSER',
    };

    expect(reducer(stateComposerHidden, action)).toEqual(
      Object.assign(initialState, { showComposer: true })
    );
  });

  it('should handle HIDE_COMPOSER action type', () => {
    const stateComposerVisible = Object.assign(initialState, {
      showComposer: true,
    });

    const action = {
      profileId,
      type: 'HIDE_COMPOSER',
    };

    expect(reducer(stateComposerVisible, action)).toEqual(
      Object.assign(initialState, { showComposer: false })
    );
  });
});
