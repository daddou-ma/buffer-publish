import Pusher from 'pusher-js';
import { actionTypes as profileSidebarActionTypes } from '@bufferapp/publish-profile-sidebar/reducer';
import { actionTypes as queueActionTypes } from '@bufferapp/publish-queue/reducer';
import { postParser } from '@bufferapp/publish-server/parsers/src';

import middleware from './middleware';

describe('middleware', () => {
  const store = {
    dispatch: jest.fn(),
    getState: () => ({}),
  };
  const next = jest.fn();
  const selectProfileAction = {
    type: profileSidebarActionTypes.SELECT_PROFILE,
    profileId: '12345',
    profile: {
      service: 'instagram',
    },
  };

  const selectIGProfileAction = {
    type: profileSidebarActionTypes.SELECT_PROFILE,
    profileId: '123456',
    profile: {
      service: 'twitter',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call next when running middleware', () => {
    middleware(store)(next)(selectProfileAction);
    expect(next).toBeCalled();
  });

  it('should create a new pusher instance', () => {
    middleware(store)(next)(selectProfileAction);
    expect(Pusher).toHaveBeenCalledWith('bd9ba9324ece3341976e', {
      authEndpoint: '/pusher/auth',
    });
  });

  it('should subscribe to both private updates and private story groups channel', () => {
    middleware(store)(next)(selectProfileAction);
    expect(Pusher.subscribe).toHaveBeenCalledWith('private-updates-12345');
    expect(Pusher.subscribe).toHaveBeenCalledWith('private-story-groups-12345');
  });

  it('should subscribe to private updates but not private story groups channel', () => {
    middleware(store)(next)(selectIGProfileAction);
    expect(Pusher.subscribe).not.toHaveBeenCalledWith(
      'private-story-groups-123456'
    );
    expect(Pusher.subscribe).toHaveBeenCalledWith('private-updates-123456');
  });

  it('should subscribe to update events', () => {
    middleware(store)(next)(selectProfileAction);
    Pusher.bind.mock.calls.forEach(call => {
      if (call[0] === 'private-updates-12345') {
        const updates = [
          'sent_update',
          'updated_update',
          'added_update',
          'deleted_update',
          'collaboration_draft_approved',
          'collaboration_draft_updated',
          'collaboration_draft_moved',
          'reordered_updates',
          'queue_paused',
        ];
        expect(updates.indexOf(call[1]) >= 0).toEqual(true);
      } else {
        const storyGroups = [
          'sent_story_group',
          'story_group_created',
          'story_group_updated',
          'story_group_deleted',
        ]
        expect(storyGroups.indexOf(call[1]) >= 0).toEqual(true);
      }
    });
    expect(Pusher.bind).toHaveBeenCalledTimes(13);
  });

  it('should dispatch when a subscribed pusher event happens', () => {
    middleware(store)(next)(selectProfileAction);
    const update = { id: '00012345', text: 'Hello, world.' };
    Pusher.simulate('private-updates-12345', 'added_update', { update });
    expect(store.dispatch).toHaveBeenCalledWith({
      type: queueActionTypes.POST_CREATED,
      profileId: '12345',
      post: postParser(update),
    });
  });
});
