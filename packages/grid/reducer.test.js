import deepFreeze from 'deep-freeze';
import reducer, { initialState, profileInitialState, actionTypes } from './reducer';

const profileId = '123456';

describe('reducer', () => {
  it('should initialize default state', () => {
    const stateAfter = initialState;
    const action = {
      type: 'INIT',
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  it('should handle gridPosts_FETCH_START action type', () => {
    const stateAfter = {
      byProfileId: {
        [profileId]: {
          loading: true,
          total: 0,
          copySuccess: false,
          customLinksDetails: {
            buttonColor: null,
            buttonType: null,
            customLinks: [],
          },
          maxCustomLinks: 3,
          gridPosts: [],
        },
      },
    };
    const action = {
      profileId,
      type: 'gridPosts_FETCH_START',
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  it('should handle gridPosts_FETCH_SUCCESS action type', () => {
    const post = { id: 'foo', text: 'i love buffer' };
    const stateAfter = {
      byProfileId: {
        [profileId]: {
          loading: false,
          copySuccess: false,
          customLinksDetails: {
            buttonColor: null,
            buttonType: null,
            customLinks: [],
          },
          maxCustomLinks: 3,
          gridPosts: [post],
          total: 1,
        },
      },
    };
    const action = {
      profileId,
      type: 'gridPosts_FETCH_SUCCESS',
      result: {
        updates: [post],
        total: 1,
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  it('should handle gridPosts_FETCH_FAIL action type', () => {
    const stateAfter = {
      byProfileId: {
        [profileId]: {
          loading: false,
          copySuccess: false,
          customLinksDetails: {
            buttonColor: null,
            buttonType: null,
            customLinks: [],
          },
          maxCustomLinks: 3,
          gridPosts: [],
          total: 0,
        },
      },
    };
    const action = {
      profileId,
      type: 'gridPosts_FETCH_FAIL',
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  it('should handle POST_IMAGE_CLICKED action type', () => {
    const post = { id: '12345', text: 'i heart buffer' };
    const postAfter = { ...post, isLightboxOpen: true };
    const stateBefore = {
      byProfileId: {
        [profileId]: Object.assign(profileInitialState, { gridPosts: { 12345: post } }),
      },
    };
    const stateAfter = {
      byProfileId: {
        [profileId]: Object.assign(profileInitialState, { gridPosts: { 12345: postAfter } }),
      },
    };
    const action = {
      type: actionTypes.POST_IMAGE_CLICKED,
      profileId,
      post: postAfter,
      updateId: postAfter.id,
    };
    deepFreeze(action);
    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });

  it('should handle POST_IMAGE_CLOSED action type', () => {
    const post = { id: '12345', text: 'i heart buffer' };
    const postAfter = { ...post, isLightboxOpen: false };
    const stateBefore = {
      byProfileId: {
        [profileId]: Object.assign(profileInitialState, { gridPosts: { 12345: post } }),
      },
    };
    const stateAfter = {
      byProfileId: {
        [profileId]: Object.assign(profileInitialState, { gridPosts: { 12345: postAfter } }),
      },
    };
    const action = {
      type: actionTypes.POST_IMAGE_CLOSED,
      profileId,
      post: postAfter,
      updateId: postAfter.id,
    };
    deepFreeze(action);
    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});
