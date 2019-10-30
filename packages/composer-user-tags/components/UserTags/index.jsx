import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/ui';
import { Person } from '@bufferapp/ui/Icon';
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
} from './style';

const UserTags = ({
  media,
  userTags = [],
  saveGlobalTags,
  onCancel,
  translations,
}) => {
  const uniqKey = identifier => `${identifier}-${new Date().getTime()}`;
  const initialCoordinateState = {
    x: null,
    y: null,
    clientX: null,
    clientY: null,
  };
  const hasUserTags = userTags && userTags.length > 0;

  const [coordinates, setCoordinates] = useState(initialCoordinateState);
  const [tags, setTags] = useState(getClientXY({ userTags, media }));
  const [showTags, setShowTags] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [showInput, setShowInput] = useState(hasUserTags);
  const MAX_TAG_LIMIT = 20;
  const reachedMaxLimit = tags && tags.length >= MAX_TAG_LIMIT;
  const inputValueLength = inputValue.replace(/ /g, '').length;
  const isAddTagDisabled = !coordinates.y || inputValueLength < 1;

  const addTag = () => {
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
  };

  const removeTag = removedUserTag => {
    const newTagArray = tags.filter(tag => tag !== removedUserTag);
    setTags(newTagArray);
  };

  const onImageClick = e => {
    const coords = getCoordinates({ e, media });
    setCoordinates(coords);
    // show input once a tag has been added
    if (!showInput) setShowInput(true);
    e.preventDefault();
  };

  const onTogglePersonIcon = () => setShowTags(!showTags);

  return (
    <Modal>
      <ModalInner>
        <ImageWrapper>
          <Image
            alt={translations.imgAltText}
            src={media.url}
            onClick={onImageClick}
          />
        </ImageWrapper>
        {hasUserTags && (
          <PersonIcon onClick={onTogglePersonIcon}>
            <Person size="medium" />
          </PersonIcon>
        )}
        {tags && (
          <Fragment>
            {tags.map(tag => (
              <ImageLabel
                tag={tag}
                showTags={showTags}
                key={uniqKey(tag.username)}
              />
            ))}
          </Fragment>
        )}
        <RightContent>
          <TopContent>
            <RightHeader>
              <Title type="h3">{translations.rightHeader}</Title>
              <Text>{translations.rightHeaderSubtext}</Text>
            </RightHeader>
            {showInput && (
              <InputWrapper>
                <TagInput
                  translations={translations}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  disabled={isAddTagDisabled}
                  addTag={addTag}
                  reachedMaxLimit={reachedMaxLimit}
                />
              </InputWrapper>
            )}
            {tags && (
              <TagList>
                {tags.map((tag, index) => (
                  <TagListItem
                    tag={tag}
                    index={index}
                    lastItem={tags.length === index + 1}
                    key={uniqKey(tag.username)}
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
                  onClick={() => saveGlobalTags(removeClientXY(tags))}
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
  saveGlobalTags: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
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
