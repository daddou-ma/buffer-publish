import React, { useState, useRef, useEffect } from 'react';
import { Transforms } from 'slate';
import { ReactEditor, useEditor } from 'slate-react';
import { blue } from '@bufferapp/ui/style/colors';
import Button from '@bufferapp/ui/Button';
import { Emoji } from '@bufferapp/ui/Icon';
import NimblePicker from 'emoji-mart/dist-es/components/picker/nimble-picker';
import emojiData from 'emoji-mart/data/apple.json';
import 'emoji-mart/css/emoji-mart.css';

import { Wrapper, PickerWrapper, NoResultsFound } from './styles';

/**
 * Custom component displayed when emoji search doesn't return emojis
 */
const NotFound = () => (
  <NoResultsFound>
    <img
      height="120"
      width="120"
      src="https://buffer-publish.s3.amazonaws.com/images/chart-error.png"
      alt=""
    />
    <p>No Emoji Found</p>
  </NoResultsFound>
);

const insertEmoji = (editor, value) => {
  const emoji = { text: value.native };
  /**
   * Inserts emoji into editor text and change focus to editor
   */
  Transforms.insertNodes(editor, emoji);
  Transforms.move(editor);
  ReactEditor.focus(editor);
};

const EmojiPicker = () => {
  const [pickerOpened, setPickerOpened] = useState(false);
  const editor = useEditor();
  const emojiPickerRef = useRef(null);

  const onClosePicker = ({ target }) => {
    if (!pickerOpened || !emojiPickerRef.current) {
      return null;
    }
    const clickedOutsideOfEmojiPicker = !emojiPickerRef.current.contains(
      target
    );

    if (clickedOutsideOfEmojiPicker) {
      setPickerOpened(false);
      ReactEditor.focus(editor);
    }
  };

  useEffect(() => {
    if (pickerOpened) {
      document.addEventListener('click', onClosePicker, true);
    } else {
      document.removeEventListener('click', onClosePicker, true);
    }
  }, [pickerOpened]);

  return (
    <Wrapper ref={emojiPickerRef}>
      <Button
        type="secondary"
        size="small"
        icon={<Emoji />}
        hasIconOnly
        onClick={() => {
          setPickerOpened(!pickerOpened);
        }}
        label="Click Me"
      />
      <PickerWrapper visible={pickerOpened}>
        <NimblePicker
          color={blue}
          title="Pick your emoji"
          emoji="point_up"
          perLine={9}
          showPreview
          data={emojiData}
          notFound={NotFound}
          onSelect={value => insertEmoji(editor, value)}
        />
      </PickerWrapper>
    </Wrapper>
  );
};

export default EmojiPicker;
