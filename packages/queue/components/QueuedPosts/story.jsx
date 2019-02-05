import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from 'storybook-addon-a11y';

import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';

import QueuedPosts from './index';
import postLists from './postData';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

const store = storeFake({
  i18n: {
    translations: {
      'upgrade-modal': {},
    },
  },
  upgradeModal: {},
  stripe: {},
  productFeatures: {
    planName: 'free',
    features: {},
  },
});

const UpgradeModalDecorator = storyFn => (
  <Provider store={store}>
    {storyFn()}
  </Provider>
);

/* eslint-disable react/prop-types */
class _TestContextContainer extends Component { // eslint-disable-line
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
const TestContextContainer = DragDropContext(TestBackend)(_TestContextContainer);

storiesOf('QueuedPosts', module)
  .addDecorator(checkA11y)
  .addDecorator(UpgradeModalDecorator)
  .addDecorator(getStory => <TestContextContainer>{getStory()}</TestContextContainer>)
  .add('default', () => (
    <QueuedPosts
      total={10}
      loading={false}
      postLists={postLists}
      onCancelConfirmClick={action('onCancelConfirmClick')}
      onDeleteClick={action('onDeleteClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      onRequeueClick={action('onRequeueClick')}
    />
  ))
  .add('loading', () => (
    <QueuedPosts
      total={0}
      loading
      postLists={postLists}
      onCancelConfirmClick={action('onCancelConfirmClick')}
      onDeleteClick={action('onDeleteClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      onRequeueClick={action('onRequeueClick')}
    />
  ))
  .add('paused', () => (
    <QueuedPosts
      total={10}
      loading={false}
      postLists={postLists}
      onCancelConfirmClick={action('onCancelConfirmClick')}
      onDeleteClick={action('onDeleteClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      paused
      onUnpauseClick={action('onUnpauseClick')}
    />
  ))
  .add('locked profile with visible modal', () => (
    <QueuedPosts
      total={10}
      loading={false}
      postLists={postLists}
      onCancelConfirmClick={action('onCancelConfirmClick')}
      onDeleteClick={action('onDeleteClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      paused
      onUnpauseClick={action('onUnpauseClick')}
      isLockedProfile
      displayLockedModal
      onCloseLockedModal={action('onUnpauseClick')}
    />
  ))
  .add('locked profile with hidden modal', () => (
    <QueuedPosts
      total={10}
      loading={false}
      postLists={postLists}
      onCancelConfirmClick={action('onCancelConfirmClick')}
      onDeleteClick={action('onDeleteClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      paused
      onUnpauseClick={action('onUnpauseClick')}
      isLockedProfile
      displayLockedModal={false}
      onCloseLockedModal={action('onUnpauseClick')}
    />
  ));
