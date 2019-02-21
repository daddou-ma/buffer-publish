import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import PastReminder, {
  reducer,
  actions,
  actionTypes,
  middleware,
} from './index';
import PastRemindersPosts from './components/PastRemindersPosts';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

describe('PastReminder', () => {
  it('should render', () => {
    const store = storeFake({
      pastReminders: {
        byProfileId: {
          abc: {
            loading: true,
            loadingMore: false,
            moreToLoad: false,
            page: 1,
            posts: [],
            total: 0,
          },
        },
      },
      appSidebar: {
        user: {
          is_business_user: false,
        },
      },
      profileSidebar: {
        selectedProfile: {
          isManager: true,
        },
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <PastReminder
          profileId="abc"
          onShareAgainClick={jest.fn()}
        />
      </Provider>,
    );
    expect(wrapper.find(PastRemindersPosts).length)
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
