import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/ui';
import { ArrowLeft, Cross, Person } from '@bufferapp/ui/Icon';
import Input from '@bufferapp/ui/Input';

import {
  UserName,
  ButtonWrapper,
  PersonIcon,
  PlainText,
  Modal,
  ModalInner,
  RightHeader,
  Image,
  RightContent,
} from './style';

const calculateTagStyles = ({ tag, showTags }) => ({
  position: 'absolute',
  left: `${tag.clientX}px`,
  top: `${tag.clientY}px`,
  color: 'white',
  backgroundColor: 'black',
  borderRadius: '7%',
  padding: '2px 5px',
  opacity: '0.7',
  display: showTags ? 'block' : 'none',
});

/** React is most efficient with unique keys for items. Quick method to create them based on a given string. */
const uniqKey = identifier => `${identifier}-${new Date().getTime()}`;

const UserTags = ({ media, userTags = [], saveGlobalTags }) => {
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

  const saveTag = () => {
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

    e.preventDefault();
  };

  const onTogglePersonIcon = () => setShowTags(!showTags);

  const TagImageLabel = ({ tag }) => (
    <div
      key={uniqKey(tag.username)}
      style={calculateTagStyles({ tag, showTags })}
    >
      {tag.username}
    </div>
  );
  TagImageLabel.propTypes = {
    tag: PropTypes.shape({
      username: PropTypes.string,
      x: PropTypes.string,
      y: PropTypes.string,
    }).isRequired,
  };

  const TagListItem = ({ tag }) => (
    <UserName key={uniqKey(tag.username)}>
      <button
        type="button"
        onClick={() => {
          removeTag(tag);
        }}
        tabIndex={0}
      >
        <Cross size="medium" />
      </button>
      {tag.username}
    </UserName>
  );
  TagListItem.propTypes = {
    tag: PropTypes.shape({
      username: PropTypes.string,
      x: PropTypes.string,
      y: PropTypes.string,
    }).isRequired,
  };

  return (
    <Modal>
      <ModalInner>
        <Image alt="" src={media.url} onClick={onImageClick} />
        <PersonIcon onClick={onTogglePersonIcon}>
          <Person size="large" />
        </PersonIcon>
        {tags && (
          <div>
            {tags.map((tag, index) => (
              <TagImageLabel
                tag={tag}
                index={index}
                key={uniqKey(tag.username)}
              />
            ))}
          </div>
        )}
        <RightContent>
          <RightHeader>
            <span>
              <ArrowLeft size="large" />
            </span>
            <Text type="h3">Tag a user</Text>
          </RightHeader>
          <Text>Click on a spot in the photo to tag</Text>
          <div style={{ display: 'flex' }}>
            <div>@</div>
            <Input
              type="input"
              onChange={e => {
                setInputValue(e.target.value);
              }}
              placeholder="username"
              value={inputValue}
              name="tagInput"
            />
            <ButtonWrapper>
              <Button
                type="primary"
                size="small"
                onClick={saveTag}
                label="Save tag"
                disabled={!coordinates.y}
              />
            </ButtonWrapper>
          </div>
          {tags && (
            <div>
              {tags.map((tag, index) => (
                <TagListItem
                  tag={tag}
                  index={index}
                  key={uniqKey(tag.username)}
                />
              ))}
            </div>
          )}
          <PlainText>
            Note: The API only allows public users to be tagged and prevents
            autocomplete in usernames. // Move to translations
          </PlainText>
          <Button onClick={() => saveGlobalTags(tags)} label="Save and Close" />
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
};

UserTags.defaultProps = {
  userTags: [],
};

export default UserTags;
