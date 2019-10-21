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

// TO-DO: Move styled components into their own css file
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

const StyledModalWrapper = styled.div`
  background-color: white;
  padding: 0px 15px 0px 0px;
  display: flex;
`;

const StyledRightHeader = styled.div`
  display: flex;
  align-items: center;
`;

const StyledImage = styled.img`
  max-height: 500px;
  width: auto;
  margin: 0 auto;
  cursor: crosshair;
  display: block;
`;

const StyledRightContent = styled.div`
  margin-left: 15px;
  width: 275px;
`;

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

const modalClassNames = {
  modal: styles.modalStyles,
  closeButton: styles.closeButton,
};

const InstagramUserTags = ({
  media,
  draftId,
  userTags = [],
}) => {
  const initialCoordinateState = { x: null, y: null, clientX: null, clientY: null };
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

  const saveGlobalTags = () => {
    ComposerActionCreators.updateDraftUserTags(draftId, tags);
    ModalActionCreators.closeModal();
  };

  const removeTag = (removedUserTag) => {
    const newTagArray = tags.filter(tag => tag !== removedUserTag);
    setTags(newTagArray);
  };

  const onImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clientX = e.clientX - rect.left; // x position within the element.
    const clientY = e.clientY - rect.top; // y position within the element.
    // final_width = max_height * start_width / start_height
    let { width, height } = media;
    if (height > 500) {
      width = (500 * width) / height;
      height = 500;
    }
    const x = (clientX / width);
    const y = (clientY / height);
    setCoordinates({
      x: x.toFixed(2),
      y: y.toFixed(2),
      clientX,
      clientY,
    });

    e.preventDefault();
  };

  const onTogglePersonIcon = () => (
    showTags ? setShowTags(false) : setShowTags(true)
  );

  const displayUserTags = ({ tag, index }) => (
    <div key={index} style={calculateTagStyles({ tag, showTags })}>
      {tag.username}
    </div>
  );

  // TO-DO: refactor to be more a11y friendly
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
      <StyledModalWrapper>
        <StyledImage
          alt=""
          src={media.url}
          onClick={onImageClick}
        />
        <StyledPersonIcon onClick={onTogglePersonIcon}>
          <Person size="large" />
        </StyledPersonIcon>
        { tags && (
          <div>
            {tags.map(({ tag, index }) => (
              displayUserTags({ tag, index })
            ))}
          </div>
        )}
        <StyledRightContent>
          <StyledRightHeader>
            <span className={styles.arrowLeftIcon}>
              <ArrowLeft size="large" />
            </span>
            <Text type="h3">Tag a user</Text>
          </StyledRightHeader>
          <Text>Click on a spot in the photo to tag</Text>
          <div style={{ display: 'flex' }}>
            <div className={styles.atSign}>@</div>
            <Input
              type="input"
              onChange={(e) => { setInputValue(e.target.value); }}
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
            tagged and prevents autocomplete in usernames. // Move to translations
          </StyledText>
          <Button
            onClick={saveGlobalTags}
            label="Save and Close"
          />
        </StyledRightContent>
      </StyledModalWrapper>
    </Modal>
  );
};

InstagramUserTags.propTypes = {
  media: PropTypes.shape({
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  draftId: PropTypes.string.isRequired,
  userTags: PropTypes.arrayOf({
    userName: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

InstagramUserTags.defaultProps = {
  userTags: [],
};

export default InstagramUserTags;
