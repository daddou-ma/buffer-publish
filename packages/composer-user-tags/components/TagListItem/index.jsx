import React from 'react';
import PropTypes from 'prop-types';
import { Cross, OpenNew } from '@bufferapp/ui/Icon';
import Tooltip from '@bufferapp/ui/Tooltip';

import { UserName, CloseButton, Link } from './style';

const getUrl = username => `https://www.instagram.com/${username}`;

const TagListItem = ({ tag, index, lastItem, removeTag, translations }) => (
  <UserName key={index} lastItem={lastItem}>
    <CloseButton
      type="button"
      onClick={() => {
        removeTag(tag);
      }}
      tabIndex={0}
    >
      <Cross size="medium" />
    </CloseButton>
    {`@${tag.username}`}
    <Link target="_blank" href={getUrl(tag.username)}>
      <Tooltip label={translations.tooltip} position="top">
        <OpenNew size="medium" />
      </Tooltip>
    </Link>
  </UserName>
);

TagListItem.propTypes = {
  tag: PropTypes.shape({
    username: PropTypes.string,
    x: PropTypes.string,
    y: PropTypes.string,
  }).isRequired,
  translations: PropTypes.shape({
    tooltip: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  removeTag: PropTypes.func.isRequired,
  lastItem: PropTypes.bool.isRequired,
};

export default TagListItem;
