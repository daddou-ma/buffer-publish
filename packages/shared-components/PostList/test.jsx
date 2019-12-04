import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import PostList from './index';

import { posts } from './postData';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

const store = storeFake({
  productFeatures: {
    planName: 'free',
    features: {},
  },
});

describe('PostList', () => {
  it('should trigger onEditClick', () => {
    const handleEditClick = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <PostList
          posts={posts}
          onDeleteConfirmClick={() => {}}
          onEditClick={handleEditClick}
          onShareNowClick={() => {}}
        />
      </Provider>
    );
    // click on the edit button
    wrapper
      .find('button')
      .at(1)
      .simulate('click');
    expect(handleEditClick).toBeCalledWith({
      post: posts[0],
    });
  });

  it('should trigger onShareNowClick', () => {
    const handleShareNowClick = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <PostList
          posts={posts}
          onDeleteConfirmClick={() => {}}
          onEditClick={() => {}}
          onShareNowClick={handleShareNowClick}
        />
      </Provider>
    );
    // click on the edit button
    wrapper
      .find('button')
      .at(2)
      .simulate('click');
    expect(handleShareNowClick).toBeCalledWith({
      post: posts[0],
    });
  });
});
