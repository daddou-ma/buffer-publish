import UnshortenedLinkTooltip from './UnshortenedLinkTooltip';
import UnshortenedLink from './UnshortenedLink';
import unshortenedLinkStrategy from './unshortenedLinkStrategy';
import addUnshortenedLink from './modifiers/addUnshortenedLink';
import decorateComponentWithProps from 'decorate-component-with-props';

const createUnshortenedLinkPlugin = () => {
  const callbacks = {
    onUnshortenedLinkMouseOver: null,
    onUnshortenedLinkMouseOut: null,
    onEditorStateChange: null,
  };

  const store = {
    getEditorState: undefined,
    setEditorState: undefined,
  };

  return {
    UnshortenedLinkTooltip: decorateComponentWithProps(UnshortenedLinkTooltip, {
      callbacks,
      store,
    }),

    decorators: [
      {
        strategy: unshortenedLinkStrategy,
        component: decorateComponentWithProps(UnshortenedLink, {
          onMouseOver: unshortenedLinkData => {
            if (callbacks.onUnshortenedLinkMouseOver) {
              callbacks.onUnshortenedLinkMouseOver(unshortenedLinkData);
            }
          },
          onMouseOut: unshortenedLinkData => {
            if (callbacks.onUnshortenedLinkMouseOut) {
              callbacks.onUnshortenedLinkMouseOut(unshortenedLinkData);
            }
          },
        }),
      },
    ],

    initialize: ({ getEditorState, setEditorState }) => {
      store.getEditorState = getEditorState;
      store.setEditorState = setEditorState;
    },

    onChange: editorState => {
      if (callbacks.onEditorStateChange) callbacks.onEditorStateChange();
      return editorState;
    },
  };
};

export default createUnshortenedLinkPlugin;
export { addUnshortenedLink };
