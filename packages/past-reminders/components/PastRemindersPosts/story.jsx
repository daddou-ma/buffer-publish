import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import PastRemindersPosts from './index';
import {
  header,
  subHeader,
  postLists,
} from './postData';

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

const StoreDecorator = storyFn => (
  <Provider store={store}>
    {storyFn()}
  </Provider>
);

storiesOf('PastRemindersPosts', module)
  .addDecorator(checkA11y)
  .addDecorator(StoreDecorator)
  .add('default', () => (
    <PastRemindersPosts
      total={10}
      loading={false}
      header={header}
      subHeader={subHeader}
      postLists={postLists}
      onCancelConfirmClick={action('onCancelConfirmClick')}
      onDeleteClick={action('onDeleteClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      onRequeueClick={action('onRequeueClick')}
      onComposerCreateSuccess={action('onComposerCreateSuccess')}
      onClickUpgrade={action('onClickUpgrade')}
    />
  ))
  .add('loading', () => (
    <PastRemindersPosts
      total={0}
      loading
      header={header}
      subHeader={subHeader}
      postLists={postLists}
      onCancelConfirmClick={action('onCancelConfirmClick')}
      onDeleteClick={action('onDeleteClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      onRequeueClick={action('onRequeueClick')}
      onComposerCreateSuccess={action('onComposerCreateSuccess')}
      onClickUpgrade={action('onClickUpgrade')}
    />
  ))
  .add('if Manager and in Business Account', () => (
    <PastRemindersPosts
      total={5}
      loading={false}
      header={header}
      subHeader={subHeader}
      postLists={postLists}
      onCancelConfirmClick={action('onCancelConfirmClick')}
      onDeleteClick={action('onDeleteClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      onRequeueClick={action('onRequeueClick')}
      onClickUpgradeToPro={action('onClickUpgradeToPro')}
      onComposerCreateSuccess={action('onComposerCreateSuccess')}
      onClickUpgrade={action('onClickUpgrade')}
      isBusinessAccount
      isManager
    />
  ))
  .add('if Contributor and in Business Account', () => (
    <PastRemindersPosts
      total={5}
      loading={false}
      header={header}
      subHeader={subHeader}
      postLists={postLists}
      onCancelConfirmClick={action('onCancelConfirmClick')}
      onDeleteClick={action('onDeleteClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      onRequeueClick={action('onRequeueClick')}
      onClickUpgradeToPro={action('onClickUpgradeToPro')}
      onComposerCreateSuccess={action('onComposerCreateSuccess')}
      onClickUpgrade={action('onClickUpgrade')}
      isBusinessAccount
      isManager={false}
    />
  ));
