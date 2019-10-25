import React from 'react';
import PropTypes from 'prop-types';
import { Cross, OpenNew } from '@bufferapp/ui/Icon';

import { UserName, CloseButton, Link } from './style';

const getUrl = username => `https://www.instagram.com/${username}`;

const TagListItem = ({ tag, index, removeTag }) => (
  <UserName key={index}>
    <CloseButton
      type="button"
      onClick={() => {
        removeTag(tag);
      }}
      tabIndex={0}
      label="Save and Close"
    >
      <Cross size="medium" />
    </CloseButton>
    {`@${tag.username}`}
    <Link target="_blank" href={getUrl(tag.username)}>
      <OpenNew size="medium" />
    </Link>
  </UserName>
);

TagListItem.propTypes = {
  tag: PropTypes.shape({
    username: PropTypes.string,
    x: PropTypes.string,
    y: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  removeTag: PropTypes.func.isRequired,
};

export default TagListItem;
