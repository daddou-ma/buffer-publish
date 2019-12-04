import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import InstagramDirectPostingModal, {
  reducer,
  actions,
  actionTypes,
} from './index';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

describe('InstagramDirectPostingModal', () => {
  it('should render', () => {
    const store = storeFake({
      profileSidebar: {
        selectedProfileId: 'id1',
      },
      queue: {
        isBusinessOnInstagram: true,
      },
      i18n: {
        translations: {
          'instagram-direct-posting-modal': {
            headline1: 'headline1',
            headline2: 'headline2',
          },
        },
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <InstagramDirectPostingModal />
      </Provider>
    );
    expect(wrapper.find(InstagramDirectPostingModal).length).toBe(1);
  });

  it('should export reducer', () => {
    expect(reducer).toBeDefined();
  });

  it('should export actions', () => {
    expect(actions).toBeDefined();
  });

  it('should export actionTypes', () => {
    expect(actionTypes).toBeDefined();
  });
});
