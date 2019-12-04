import React from 'react';
import PropTypes from 'prop-types';

import { mystic, offWhite } from '@bufferapp/components/style/color';
import { borderWidth } from '@bufferapp/components/style/border';
import { Text, Image } from '@bufferapp/components';

const getPostMetaBarStyle = (dragging, isSent) => ({
  display: 'flex',
  padding: '0.5rem 1rem',
  backgroundColor: offWhite,
  borderTop: `${borderWidth} solid ${mystic}`,
  borderBottom: `${borderWidth} solid ${mystic}`,
  opacity: dragging ? 0 : 1,
  marginBottom: isSent ? 0 : 10,
});

const getImageWrapperStyle = avatarUrl => ({
  padding: avatarUrl ? '0 0.5rem' : '0 0.1rem',
  display: 'flex',
  justifyContent: 'center' /* align horizontal */,
});

const leftContentStyle = {
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
};

const renderLeftContent = leftContent => (
  <span style={leftContentStyle}>
    <Text size={'small'} color={'black'}>
      {leftContent.title}
    </Text>
    <div style={getImageWrapperStyle(leftContent.avatarUrl)}>
      {leftContent.avatarUrl && (
        <Image height="1.3rem" src={leftContent.avatarUrl} />
      )}
    </div>
    <Text size={'small'} color={'black'}>
      {leftContent.text}
    </Text>
  </span>
);

const PostMetaBar = ({ leftContent, rightContent, dragging, isSent }) => (
  <div style={getPostMetaBarStyle(dragging, isSent)}>
    {renderLeftContent(leftContent)}
    {rightContent && (
      <span>
        <Text size={'small'} color={'black'}>
          {rightContent.title} {rightContent.text}
        </Text>
      </span>
    )}
  </div>
);

PostMetaBar.propTypes = {
  dragging: PropTypes.bool,
  isSent: PropTypes.bool,
  leftContent: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    avatarUrl: PropTypes.string,
  }).isRequired,
  rightContent: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  }),
};

export default PostMetaBar;
