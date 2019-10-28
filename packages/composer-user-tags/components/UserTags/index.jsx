import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/ui';
import { Person } from '@bufferapp/ui/Icon';
import UserTagInput from '../UserTagInput';
import UserTagListItem from '../UserTagListItem';
import UserTagImageLabel from '../UserTagImageLabel';

import {
  PersonIcon,
  TextWrapper,
  Modal,
  ModalInner,
  RightHeader,
  Image,
  RightContent,
  Line,
  TopContent,
  BottomContent,
  TagList,
  ListWrapper,
  Title,
  FooterButtons,
  SaveButton,
} from './style';

const UserTags = ({
  media,
  userTags = [],
  saveGlobalTags,
  onCancel,
  translations,
}) => {
  const initialCoordinateState = {
    x: null,
    y: null,
    clientX: null,
    clientY: null,
  };
  const [coordinates, setCoordinates] = useState(initialCoordinateState);
  const [tags, setTags] = useState(userTags);
  const [showTags, setShowTags] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [showInput, setShowInput] = useState(!!userTags);

  const MAX_TAG_LIMIT = 20;
  const reachedMaxLimit = tags && tags.length >= MAX_TAG_LIMIT;

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
    const rect = e.target.getBoundingClientRect();
    const clientX = e.clientX - rect.left; // x position within the element.
    const clientY = e.clientY - rect.top; // y position within the element.
    // final_width = max_height * start_width / start_height
    let { width, height } = media;
    if (height > 500) {
      width = (500 * width) / height;
      height = 500;
    }
    const x = clientX / width;
    const y = clientY / height;
    setCoordinates({
      x: x.toFixed(2),
      y: y.toFixed(2),
      clientX,
      clientY,
    });
    setShowInput(true);
    e.preventDefault();
  };

  const onTogglePersonIcon = () => setShowTags(!showTags);

  return (
    <Modal>
      <ModalInner>
        <Image alt="" src={media.url} onClick={onImageClick} />
        <PersonIcon onClick={onTogglePersonIcon}>
          <Person size="large" />
        </PersonIcon>
        {tags && (
          <Fragment>
            {tags.map(tag => (
              <UserTagImageLabel tag={tag} showTags={showTags} key={tag} />
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
              <ListWrapper>
                <UserTagInput
                  translations={translations}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  coordinates={coordinates}
                  addTag={addTag}
                  reachedMaxLimit={reachedMaxLimit}
                />
              </ListWrapper>
            )}
            {tags && (
              <TagList>
                {tags.map((tag, index) => (
                  <UserTagListItem
                    tag={tag}
                    index={index}
                    key={tag}
                    removeTag={tagItem => removeTag(tagItem)}
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
              <Button onClick={onCancel} label="Cancel" type="text" />
              <SaveButton>
                <Button
                  onClick={() => saveGlobalTags(tags)}
                  type="secondary"
                  label="Save"
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
      userName: PropTypes.string,
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
    btnClose: PropTypes.string,
  }).isRequired,
};

UserTags.defaultProps = {
  userTags: [],
};

export default UserTags;
