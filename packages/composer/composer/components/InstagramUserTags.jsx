import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/ui';
import { ArrowLeft, Cross, Person } from '@bufferapp/ui/Icon';
import Input from '@bufferapp/ui/Input';
import styled from 'styled-components';
import Modal from '../__legacy-buffer-web-shared-components__/modal/modal';
import ModalActionCreators from '../__legacy-buffer-web-shared-components__/modal/actionCreators';
import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import styles from './css/InstagramUserTags.css';

const StyledUserName = styled.div`
  display: flex;
  marginTop: 5px;
`;

const StyledButtonWrapper = styled.div`
  marginLeft: 5px;
  marginTop: 9px;
`;

const StyledPersonIcon = styled.div`
  position: absolute;
  bottom: 7px;
  left: 7px;
  color: black;
  cursor: pointer;
`;

const StyledText = styled(Text)`
   marginTop: 12px;
`;

const InstagramUserTags = ({
  media,
  draftId,
  userTags = [],
}) => {
  const initialCoordinateState = { x: null, y: null, xPosition: null, yPosition: null };
  const [coordinates, setCoordinates] = useState(initialCoordinateState);
  const [tags, setTags] = useState(userTags);
  const [showTags, setShowTags] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const saveTag = () => {
    const { x, y, xPosition, yPosition } = coordinates;
    const userTag = {
      username: inputValue,
      x,
      y,
      xPosition,
      yPosition,
    };
    setTags([...tags, userTag]);
    setInputValue('');
    setCoordinates(initialCoordinateState);
  };

  const saveGlobalTags = () => {
    ComposerActionCreators.updateDraftUserTags(draftId, tags);
    ModalActionCreators.closeModal();
  };

  const setInput = (e) => {
    setInputValue(e.target.value);
  };

  const removeTag = (removedUserTag) => {
    const newArray = tags.filter(tag => tag !== removedUserTag);
    setTags(newArray);
  };

  const onImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const xPosition = e.clientX - rect.left; // x position within the element.
    const yPosition = e.clientY - rect.top; // y position within the element.
    // final_width = max_height * start_width / start_height
    let { width, height } = media;
    if (height > 500) {
      width = (500 * width) / height;
      height = 500;
    }
    const x = (xPosition / width);
    const y = (yPosition / height);
    setCoordinates({ x: x.toFixed(2), y: y.toFixed(2), xPosition, yPosition });
    e.preventDefault();
  }

  const onTogglePersonIcon = () => (
    showTags ? setShowTags(false) : setShowTags(true)
  );

  const modalClassNames = {
    modal: styles.modalStyles,
    closeButton: styles.closeButton,
  };

  const calculateTagStyles = tag => ({
    position: 'absolute',
    left: `${tag.xPosition}px`,
    top: `${tag.yPosition}px`,
    color: 'white',
    backgroundColor: 'black',
    borderRadius: '7%',
    padding: '2px 5px',
    opacity: '0.7',
    display: showTags ? 'block' : 'none',
  });

  const displayUserTags = (tag, index) => (
    <div key={index} style={calculateTagStyles(tag)}>
      {tag.username}
    </div>
  );

  const renderUsername = (tag, index) => (
    <StyledUserName key={index}>
      <a
        className={styles.crossIcon}
        onClick={() => { removeTag(tag); }}
        tabIndex={0}
        role="link"
      >
        <Cross size="medium" />
      </a>
      {tag.username}
    </StyledUserName>
  );

  return (
    <Modal classNames={modalClassNames} hideCloseButton>
      <div className={styles.wrapper}>
        <div>
          <img
            alt=""
            className={styles.media}
            src={media.url}
            onClick={onImageClick}
          />
          <StyledPersonIcon onClick={onTogglePersonIcon}>
            <Person size="large" />
          </StyledPersonIcon>
          { tags && (
            <div>
              {tags.map((tag, index) => (
                displayUserTags(tag, index)
              ))}
            </div>
          )}
        </div>
        <div className={styles.rightContentWrapper}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className={styles.arrowLeftIcon}>
              <ArrowLeft size="large" />
            </span>
            <Text type="h3">Tag a user</Text>
          </div>
          <Text>Click on a spot in the photo to tag</Text>
          <div style={{ display: 'flex' }}>
            <div className={styles.atSign}>@</div>
            <Input
              type="input"
              onChange={setInput}
              placeholder="username"
              value={inputValue}
              name="tagInput"
            />
            <StyledButtonWrapper>
              <Button
                type="primary"
                size="small"
                onClick={saveTag}
                label="Save tag"
                disabled={!coordinates.y}
              />
            </StyledButtonWrapper>
          </div>
          {tags && (
            <div>
              {tags.map((tag, index) => (
                renderUsername(tag, index))
              )}
            </div>
          )}
          <StyledText>
            Note: The Instagram API only allows public users to be
            tagged and prevents autocomplete in usernames.
          </StyledText>
          <Button
            onClick={saveGlobalTags}
            label="Save and Close"
          />
        </div>
      </div>
    </Modal>
  );
};

export default InstagramUserTags;
