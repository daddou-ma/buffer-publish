import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import ConfirmModal from './index';

storiesOf('ConfirmModal', module)
  .addDecorator(withA11y)
  .add('Modal for posting schedule', () => (
    <div>
      <ConfirmModal
        onConfirmClick={() => {}}
        onCloseModal={() => {}}
        profileName="hello_world"
        profileService="twitter"
        avatar="https://pbs.twimg.com/profile_images/901516345476603904/e2F5vE32_normal.jpg"
        heading={'Are you sure?'}
        body={
          'Would you like us to remove all your posting times for <span style="font-weight: bold">hello_world</span>?'
        }
        btnText={"I'm sure, empty it"}
      />
    </div>
  ))
  .add('Modal for shuffle queue', () => (
    <div>
      <ConfirmModal
        onConfirmClick={() => {}}
        onCloseModal={() => {}}
        profileName="hello_world"
        profileService="twitter"
        heading={'Are you sure?'}
        body={`Your first 200 queued updates for <span style="font-weight:bold">hello_world</span> will be shuffled
        into a completely random order.`}
        btnText={'Shuffle Queue'}
      />
    </div>
  ));
