import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Button } from '@bufferapp/ui';
import { actions as storyGroupActions } from '@bufferapp/publish-story-group-composer';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';
import StoryPreview, {
  reducer,
  actions,
  actionTypes,
  middleware,
} from './index';
import PreviewPopover from './components/PreviewPopover';
import ViewNote from './components/ViewNote';
import EditNote from './components/EditNote';

describe('StoryPreview', () => {
  describe('Component', () => {
    let store;

    beforeEach(() => {
      const stories = [
        {
          note: 'Note 1',
          type: 'image',
          order: 1,
          asset_url:
            'https://images.unsplash.com/photo-1562887189-e5d078343de4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80',
          thumbnail_url: '',
        },
      ];
      const storeFake = state => ({
        default: () => {},
        subscribe: () => {},
        dispatch: jest.fn(),
        getState: () => ({ ...state }),
      });

      store = storeFake({
        storyPreview: {
          stories,
          storyGroupId: 'id1',
          profileId: 'id2',
          scheduledAt: null,
          user: {},
        },
        i18n: {
          translations: {
            'story-preview': translations['story-preview'],
          },
        },
      });
    });

    it('renders', () => {
      const wrapper = mount(
        <Provider store={store}>
          <StoryPreview />
        </Provider>
      );
      expect(wrapper.find(PreviewPopover).length).toBe(1);
      wrapper.unmount();
    });

    it('dispatches a handleSaveNoteClick action when click on Save Note in the Preview opened through the queue', () => {
      const wrapper = mount(
        <Provider store={store}>
          <StoryPreview view="queue" />
        </Provider>
      );

      // User is in SEE_NOTE mode and clicks to edit note
      wrapper
        .find(ViewNote)
        .at(0)
        .find(Button)
        .at(0)
        .find('button')
        .at(0)
        .simulate('click');

      // User changes the note in the textarea
      wrapper
        .find(EditNote)
        .at(0)
        .find('textarea')
        .at(0)
        .simulate('change', { target: { value: 'Note Queue' } });

      // User clicks on save note button
      wrapper
        .find(EditNote)
        .at(0)
        .find(Button)
        .at(1)
        .find('button')
        .at(0)
        .simulate('click');

      expect(store.dispatch).toHaveBeenCalledWith(
        actions.handleSaveNoteClick({ order: 1, note: 'Note Queue' })
      );
      wrapper.unmount();
    });

    it('dispatches a handleSaveNoteComposer action when click on Save Note in the Preview opened through the composer', () => {
      const wrapper = mount(
        <Provider store={store}>
          <StoryPreview view="composer" />
        </Provider>
      );

      // User is in SEE_NOTE mode and clicks to edit note
      wrapper
        .find(ViewNote)
        .at(0)
        .find(Button)
        .at(0)
        .find('button')
        .at(0)
        .simulate('click');

      // User changes the note in the textarea
      wrapper
        .find(EditNote)
        .at(0)
        .find('textarea')
        .at(0)
        .simulate('change', { target: { value: 'Note Composer' } });

      // User clicks on save note button
      wrapper
        .find(EditNote)
        .at(0)
        .find(Button)
        .at(1)
        .find('button')
        .at(0)
        .simulate('click');

      expect(store.dispatch).toHaveBeenCalledWith(
        actions.handleSaveNoteComposer({ order: 1, note: 'Note Composer' })
      );
      expect(store.dispatch).toHaveBeenCalledWith(
        storyGroupActions.handleSaveStoryNote({
          order: 1,
          note: 'Note Composer',
        })
      );
      wrapper.unmount();
    });
  });

  it('exports reducer', () => {
    expect(reducer).toBeDefined();
  });

  it('exports actions', () => {
    expect(actions).toBeDefined();
  });

  it('exports actionTypes', () => {
    expect(actionTypes).toBeDefined();
  });

  it('exports middleware', () => {
    expect(middleware).toBeDefined();
  });
});
