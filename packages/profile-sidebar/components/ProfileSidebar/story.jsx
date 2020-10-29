import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import store from '@bufferapp/publish-store';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import ProfileSidebar from './index';
import { profiles } from '../../mockData/profiles';

const lotsOfProfiles = () =>
  [...Array(10)].reduce(p => [...p, ...profiles], []);

const translations = {
  connectButton: 'Manage Channels',
};

/* eslint-disable react/prop-types */
class _TestContextContainer extends Component {
  // eslint-disable-line
  render() {
    return <div>{this.props.children}</div>;
  }
}
const TestContextContainer = DragDropContext(TestBackend)(
  _TestContextContainer
);

storiesOf('ProfileSidebar', module)
  .addDecorator(withA11y)
  .addDecorator(getStory => <Provider store={store}>{getStory()}</Provider>)
  .addDecorator(getStory => (
    <TestContextContainer>{getStory()}</TestContextContainer>
  ))
  .add('should display a list of profiles', () => (
    <ProfileSidebar
      selectedProfileId="1234"
      profiles={profiles}
      translations={translations}
      onProfileClick={action('profile click')}
      onManageSocialAccountClick={action('manage social account click')}
      goToConnectSocialAccount={action('connect social account click')}
      profileLimit={3}
      loading={false}
      showSwitchPlanModal={action('showSwitchPlanModal')}
      onDropProfile={action('onDropProfile')}
      hasInstagram={false}
      hasFacebook={false}
      hasTwitter={false}
    />
  ))
  .add('should display a long list of profiles', () => (
    <ProfileSidebar
      profiles={lotsOfProfiles()}
      translations={translations}
      onProfileClick={action('profile click')}
      selectedProfile={profiles[0]}
      onManageSocialAccountClick={action('manage social account click')}
      goToConnectSocialAccount={action('connect social account click')}
      profileLimit={3}
      loading={false}
      showSwitchPlanModal={action('showSwitchPlanModal')}
      onDropProfile={action('onDropProfile')}
      hasInstagram={false}
      hasFacebook={false}
      hasTwitter={false}
    />
  ));
