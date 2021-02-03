import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import ProfileList from './index';
import { profiles } from '../../mockData/profiles';
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

storiesOf('ProfileList', module)
  .addDecorator(withA11y)
  .addDecorator(getStory => (
    <TestContextContainer>{getStory()}</TestContextContainer>
  ))
  .add('should display a list of profiles', () => (
    <ProfileList
      profiles={profiles}
      selectedProfileId="1234"
      onProfileClick={action('profile click')}
    />
  ));
