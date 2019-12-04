import ShortLink from './ShortLink';
import ShortLinkTooltip from './ShortLinkTooltip';
import shortLinkStrategy from './shortLinkStrategy';
import addShortLink from './modifiers/addShortLink';
import replaceLink from './modifiers/replaceLink';
import decorateComponentWithProps from 'decorate-component-with-props';

const createShortLinkPlugin = () => {
  const callbacks = {
    onShortLinkMouseOver: null,
    onShortLinkMouseOut: null,
    onEditorStateChange: null,
  };

  const store = {
    getEditorState: undefined,
    setEditorState: undefined,
  };

  return {
    ShortLinkTooltip: decorateComponentWithProps(ShortLinkTooltip, {
      callbacks,
      store,
    }),

    decorators: [
      {
        strategy: shortLinkStrategy,
        component: decorateComponentWithProps(ShortLink, {
          onMouseOver: shortLinkData => {
            if (callbacks.onShortLinkMouseOver)
              callbacks.onShortLinkMouseOver(shortLinkData);
          },
          onMouseOut: shortLinkData => {
            if (callbacks.onShortLinkMouseOut)
              callbacks.onShortLinkMouseOut(shortLinkData);
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

export default createShortLinkPlugin;
export { addShortLink, replaceLink };
