import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Drafts from './index';
import reducer, {
  actions,
  actionTypes,
} from './reducer';
import middleware from './middleware';
import DraftList from './components/DraftList';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

describe('Drafts', () => {
  describe('Component', () => {
    const draft = {
      id1: {
        id: 'id1',
        createdAt: 1544015910,
        profileId: 'abc',
        isPastDue: true,
        imageUrls: [],
        links: [],
        profileTimezone: 'Europe/London',
        linkAttachment: {},
        needsApproval: false,
        postDetails: {},
        profile_service: 'twitter',
        retweetCommentLinks: [],
        sent: false,
        text: 'Draft',
        type: 'text',
        media: {},
        scheduled_at: 1544015940,
        scheduledAt: 1544015940,
        pinned: false,
        isFixed: true,
        user: {
          email: 'admin@bufferapp.com',
          name: 'Buffer Admin',
          gravatar: 'https://secure.gravatar.com/avatar/3a7d27d63bfd66b2ca44e53620d464b3?s=40&d=mm',
          avatar: 'https://secure.gravatar.com/avatar/3a7d27d63bfd66b2ca44e53620d464b3?s=80&d=mm',
          id: '5c07ac46dc10b700014b1f33',
        },
      },
    };

    const state = {
      profileSidebar: {
        profiles: [
          { id: 'abc', paused: false },
        ],
        selectedProfile: {
          id: 'abc',
          isManager: true,
        },
      },
      appSidebar: {
        user: {
          features: [],
        },
      },
      drafts: {
        byProfileId: {
          abc: {
            loading: true,
            loadingMore: false,
            moreToLoad: false,
            page: 1,
            drafts: draft,
            total: 0,
          },
        },
      },
      environment: {
        environment: 'production',
      },
      productFeatures: {
        planName: 'pro',
      },
    };
    it('should render', () => {
      const store = storeFake(state);
      const wrapper = mount(
        <Provider store={store}>
          <Drafts
            profileId="abc"
            tabId="drafts"
          />
        </Provider>,
      );
      expect(wrapper.find(DraftList).length)
        .toBe(1);
      expect(wrapper.find(DraftList).prop('postLists').length)
        .toBe(1);
      expect(wrapper.find(DraftList).prop('postLists')[0].draftDetails)
        .toBeDefined();
      wrapper.unmount();
    });
  });

  it('should export reducer', () => {
    expect(reducer)
      .toBeDefined();
  });

  it('should export actions', () => {
    expect(actions)
      .toBeDefined();
  });

  it('should export actionTypes', () => {
    expect(actionTypes)
      .toBeDefined();
  });

  it('should export middleware', () => {
    expect(middleware)
      .toBeDefined();
  });
});
