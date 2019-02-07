import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@bufferapp/components';
import { white } from '@bufferapp/components/style/color';

const errorBannerWrapper = dragging => ({
  backgroundColor: '#E0364F', // get color from new design system when rolled out
  padding: '8px 16px',
  color: white,
  display: 'flex',
  alignItems: 'center',
  marginLeft: '-1px',
  marginRight: '-1px',
  lineHeight: '20px',
  borderRadius: '4px 4px 0 0',
  opacity: dragging ? 0 : 1,
});

const createMarkup = error => (
  { __html: error }
);

// Need to add <a> style because can't directly get to <a> in error html string
const PostErrorBanner = ({ dragging, error }) => (
  <div id="errorBanner" style={errorBannerWrapper(dragging)}>
    <style>{`
      #errorBanner a { color: ${white}; }
    `}
    </style>
    <Text
      size={'mini'}
      weight={'medium'}
      color={'white'}
    >
      <div dangerouslySetInnerHTML={createMarkup(error)} />
    </Text>
  </div>
);

PostErrorBanner.propTypes = {
  error: PropTypes.string,
  dragging: PropTypes.bool,
};

export default PostErrorBanner;
