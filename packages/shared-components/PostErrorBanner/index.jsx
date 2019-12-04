import React from 'react';
import PropTypes from 'prop-types';
import { Text, Link } from '@bufferapp/components';
import { white } from '@bufferapp/components/style/color';

const errorWrapperStyle = dragging => ({
  backgroundColor: '#E0364F', // get color name from new design system when rolled out
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

const errorMessageStyle = link => ({
  marginRight: link ? '24px' : 'auto',
});

const errorButtonStyle = {
  whiteSpace: 'nowrap',
  backgroundColor: '#9D2637',
  padding: '0 8px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '4px',
  marginLeft: 'auto',
  cursor: 'pointer',
};

// using new design system styles, replace btn when system gets rolled out
const renderButton = link => (
  <div style={errorButtonStyle}>
    <Link newTab unstyled href={link}>
      <Text size={'mini'} weight={'medium'} color={'white'}>
        Learn More
      </Text>
    </Link>
  </div>
);

const PostErrorBanner = ({ dragging, error, errorLink }) => (
  <div style={errorWrapperStyle(dragging)}>
    <div style={errorMessageStyle(errorLink)}>
      <Text size={'mini'} weight={'medium'} color={'white'}>
        {error}
      </Text>
    </div>
    {errorLink && renderButton(errorLink)}
  </div>
);

PostErrorBanner.propTypes = {
  error: PropTypes.string,
  errorLink: PropTypes.string,
  dragging: PropTypes.bool,
};

export default PostErrorBanner;
