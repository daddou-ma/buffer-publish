import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { Provider } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import TestBackend from 'react-dnd-test-backend';
import store from '@bufferapp/publish-store';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';

import CampaignsPage from './index';

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

storiesOf('Campaigns|CampaignsPage', module)
  .addDecorator(withA11y)
  .addDecorator(getStory => <Provider store={store}>{getStory()}</Provider>)
  .addDecorator(getStory => (
    <TestContextContainer>{getStory()}</TestContextContainer>
  ))
  .add('default', () => (
    <CampaignsPage
      translations={translations.campaigns}
      campaigns={[]}
      onCreateCampaignClick={action('createCampaign')}
    />
  ));
