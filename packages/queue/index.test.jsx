import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Queue, {
  reducer,
  actions,
  actionTypes,
  middleware,
} from './index';
import QueuedPosts from './components/QueuedPosts';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

describe('Queue', () => {
  it('should render', () => {
    const store = storeFake({
      profileSidebar: {
        profiles: [
          { id: 'abc', paused: false },
        ],
        selectedProfile: {
          isManager: true,
        },
      },
      appSidebar: {
        user: {
          features: [],
        },
      },
      queue: {
        byProfileId: {
          abc: {
            loading: true,
            loadingMore: false,
            moreToLoad: false,
            page: 1,
            posts: [],
            total: 0,
            showCalendar: false,
          },
        },
      },
      modals: {
        showInstagramDirectPostingModal: false,
      },
      environment: {
        environment: 'production',
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Queue
          profileId="abc"
          postLists={[]}
          onCancelConfirmClick={jest.fn()}
          onDeleteClick={jest.fn()}
          onDeleteConfirmClick={jest.fn()}
          onEditClick={jest.fn()}
          onRequeueClick={jest.fn()}
          onShareNowClick={jest.fn()}
          onCalendarToggleClick={jest.fn()}
        />
      </Provider>,
    );
    expect(wrapper.find(QueuedPosts).length)
      .toBe(1);
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
