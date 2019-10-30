import React, { useState, useRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/ui';
import { Person } from '@bufferapp/ui/Icon';
import uuid from 'uuid/v4';
import TagInput from '../TagInput';
import TagListItem from '../TagListItem';
import ImageLabel from '../ImageLabel';
import { getClientXY, removeClientXY, getCoordinates } from '../../utils/Tags';

import {
  BottomContent,
  FooterButtons,
  Image,
  ImageWrapper,
  InputWrapper,
  Line,
  Modal,
  ModalInner,
  PersonIcon,
  ResponsiveContainer,
  RightContent,
  RightHeader,
  SaveButton,
  TagList,
  TextWrapper,
  Title,
  TopContent,
  CoordinateMarker,
} from './style';

const UserTags = ({
  media,
  userTags = [],
  saveGlobalTags,
  onCancel,
  translations,
  selectedChannels,
  trackTag,
  trackAllTags,
}) => {
  const initialCoordinateState = {
    x: null,
    y: null,
    clientX: null,
    clientY: null,
  };

  const [coordinates, setCoordinates] = useState(initialCoordinateState);
  const [tags, setTags] = useState(getClientXY(userTags));
  const hasUserTags = tags && tags.length > 0;
  const [showTags, setShowTags] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [showInput, setShowInput] = useState(hasUserTags);
  const tagInputRef = useRef(null);

  const MAX_TAG_LIMIT = 20;

  const reachedMaxLimit = tags && tags.length >= MAX_TAG_LIMIT;
  const inputValueLength = inputValue.replace(/ /g, '').length;
  const isAddTagDisabled = !coordinates.y || inputValueLength < 1;
  const isTagInputDisabled = !coordinates.y;

  const addTag = e => {
    const { x, y, clientX, clientY } = coordinates;
    const userTag = {
      username: inputValue,
      x,
      y,
      clientX,
      clientY,
    };
    setTags([...tags, userTag]);
    setInputValue('');
    setCoordinates(initialCoordinateState);
    setShowTags(true);
    if (tagInputRef.current) {
      tagInputRef.current.blur();
    }
    selectedChannels.forEach(channel => {
      if (channel.isBusinessProfile) {
        trackTag({ channel, username: inputValue });
      }
    });
    if (e) e.preventDefault();
  };

  const saveTags = () => {
    const globalTags = removeClientXY(tags);
    saveGlobalTags(globalTags);
    selectedChannels.forEach(channel => {
      if (channel.isBusinessProfile) {
        trackAllTags({ channel, tags });
      }
    });
  };

  const removeTag = removedUserTag => {
    const newTagArray = tags.filter(tag => tag !== removedUserTag);
    setTags(newTagArray);
  };

  const onImageClick = e => {
    const coords = getCoordinates({ e, media });
    setCoordinates(coords);
    // show input once a tag has been added
    setShowInput(true);
    setTimeout(() => {
      if (tagInputRef.current) {
        tagInputRef.current.focus();
      }
    }, 0);
    e.preventDefault();
  };

  const onTogglePersonIcon = () => setShowTags(!showTags);

  return (
    <Modal>
      <ModalInner>
        <ResponsiveContainer>
          <ImageWrapper>
            <Image
              alt={translations.imgAltText}
              src={media.url}
              onClick={onImageClick}
            />
            {tags && (
              <Fragment>
                {tags.map(tag => (
                  <ImageLabel tag={tag} showTags={showTags} key={uuid()} />
                ))}
              </Fragment>
            )}
            <CoordinateMarker coordinates={coordinates} />
          </ImageWrapper>
        </ResponsiveContainer>
        {hasUserTags && (
          <PersonIcon onClick={onTogglePersonIcon}>
            <Person size="medium" />
          </PersonIcon>
        )}
        <RightContent>
          <TopContent>
            <RightHeader>
              <Title type="h3">{translations.rightHeader}</Title>
              <Text>{translations.rightHeaderSubtext}</Text>
            </RightHeader>
            <form onSubmit={addTag}>
              {showInput && (
                <InputWrapper>
                  <TagInput
                    translations={translations}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    disabled={isAddTagDisabled}
                    inputDisabled={isTagInputDisabled}
                    addTag={addTag}
                    reachedMaxLimit={reachedMaxLimit}
                    ref={tagInputRef}
                  />
                </InputWrapper>
              )}
            </form>
            {tags && (
              <TagList showingInput={showInput}>
                {tags.map((tag, index) => (
                  <TagListItem
                    tag={tag}
                    index={index}
                    lastItem={tags.length === index + 1}
                    key={uuid()}
                    removeTag={tagItem => removeTag(tagItem)}
                    translations={translations}
                  />
                ))}
              </TagList>
            )}
          </TopContent>
          <BottomContent>
            <Line />
            <TextWrapper>
              <Text>{translations.footerText}</Text>
            </TextWrapper>
            <FooterButtons>
              <Button
                onClick={onCancel}
                label={translations.btnCancel}
                type="text"
              />
              <SaveButton>
                <Button
                  onClick={saveTags}
                  type="secondary"
                  label={translations.btnSave}
                  fullWidth
                />
              </SaveButton>
            </FooterButtons>
          </BottomContent>
        </RightContent>
      </ModalInner>
    </Modal>
  );
};

UserTags.propTypes = {
  media: PropTypes.shape({
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  userTags: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
      x: PropTypes.number,
      y: PropTypes.number,
    })
  ),
  selectedChannels: PropTypes.arrayOf(
    PropTypes.shape({
      serviceId: PropTypes.string,
      id: PropTypes.number,
      service: PropTypes.shape({ username: PropTypes.string }),
    })
  ).isRequired,
  saveGlobalTags: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  trackTag: PropTypes.func.isRequired,
  trackAllTags: PropTypes.func.isRequired,
  translations: PropTypes.shape({
    rightHeader: PropTypes.string,
    rightHeaderSubtext: PropTypes.string,
    placeholder: PropTypes.string,
    inputLabel: PropTypes.string,
    inputBtnLabel: PropTypes.string,
    footerText: PropTypes.string,
    maxLimitText: PropTypes.string,
    btnSave: PropTypes.string,
    btnCancel: PropTypes.string,
    imgAltText: PropTypes.string,
  }).isRequired,
};

UserTags.defaultProps = {
  userTags: [],
};

export default UserTags;
