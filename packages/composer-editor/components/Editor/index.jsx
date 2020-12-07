import React, { useMemo, useCallback, useState } from 'react';
import { Text, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, withReact } from 'slate-react';
import twitterText from 'twitter-text';

import Editor from './styles';
import renderLeaf from '../Leaf';
import renderElement from '../Element';
import EmojiPicker from '../plugins/EmojiPicker';

const initialValue = [
  {
    children: [
      {
        text: '',
      },
    ],
  },
];

const ComposerEditor = () => {
  /**
   * This stores the value of the editor
   */
  const [value, setValue] = useState(initialValue);

  /**
   * Create the Slate editor. Each function wrapping `createEditor()` enhances
   * the object with helpers to support different things
   */
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const decorate = useCallback(
    ([node, path]) => {
      const ranges = [];
      const charLimit = 20; // Temporary static data
      const { text } = node;

      if (!Text.isText(node)) {
        return ranges;
      }

      // Add text decorator to highlight words with links, hashtags and mentions
      const linksArray = twitterText.extractUrlsWithIndices(text) || [];
      const hashtagsArray = twitterText.extractHashtagsWithIndices(text) || [];
      const mentionsArray = twitterText.extractMentionsWithIndices(text) || [];
      const highlightsArray = [
        ...linksArray,
        ...hashtagsArray,
        ...mentionsArray,
      ];

      highlightsArray.forEach(word => {
        const startIndex = word.indices[0];
        const endIndex = word.indices[1];

        ranges.push({
          highlighted: true,
          anchor: { path, offset: startIndex },
          focus: { path, offset: endIndex },
        });
      });

      // Add text decorator after reaching characters limit
      if (text?.length > charLimit) {
        ranges.push({
          overCharLimit: true,
          anchor: { path, offset: charLimit },
          focus: { path, offset: text.length },
        });
      }

      return ranges;
    },
    [value]
  );

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => {
        setValue(newValue);
      }}
    >
      <Editor
        className="editor"
        placeholder="What would you like to share?"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        decorate={decorate}
      />
      <EmojiPicker />
    </Slate>
  );
};

export default ComposerEditor;
