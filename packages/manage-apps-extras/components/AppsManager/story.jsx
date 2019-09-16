import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y/register';
import { action } from '@storybook/addon-actions';
import AppsManager from './index';

const connectedApps = [
  {
    id: 'id1',
    name: 'Buffer client 1',
  },
  {
    id: 'id2',
    name: 'Buffer client 2',
  },
];

storiesOf('AppsManager', module)
  .addDecorator(checkA11y)
  .add('without connected apps', () => (
    <AppsManager
      onRequestCloseModal={action('onRequestCloseModal')}
      connectedApps={[]}
      onRequestOpenModal={action('onRequestOpenModal')}
      onConfirmRevokeApp={action('onConfirmRevokeApp')}
    />
  ))
  .add('with connected apps', () => (
    <AppsManager
      connectedApps={connectedApps}
      onRequestOpenModal={action('onRequestOpenModal')}
      onRequestCloseModal={action('onRequestCloseModal')}
      onConfirmRevokeApp={action('onConfirmRevokeApp')}
    />
  ))
  .add('show modal with name', () => (
    <AppsManager
      connectedApps={connectedApps}
      onRequestOpenModal={action('onRequestOpenModal')}
      onRequestCloseModal={action('onRequestCloseModal')}
      onConfirmRevokeApp={action('onConfirmRevokeApp')}
      showModalAppId={'1'}
      showModalAppName={'App 1'}
    />
  ));
