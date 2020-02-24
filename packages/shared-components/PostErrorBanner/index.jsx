import React from 'react';
import PropTypes from 'prop-types';
import { Text, Link } from '@bufferapp/components';
import { white, red, redDark } from '@bufferapp/ui/style/colors';

const errorWrapperStyle = dragging => ({
  backgroundColor: red, // get color name from new design system when rolled out
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
  backgroundColor: redDark,
  padding: '0 8px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '4px',
  marginLeft: 'auto',
  cursor: 'pointer',
};

// using new design system styles, replace btn when system gets rolled out
const renderLinkButton = ({ errorLink, errorLabel, errorAction }) => (
  <div style={errorButtonStyle}>
    <Link
      newTab
      unstyled
      href={errorLink}
      onClick={errorAction ? () => errorAction({ type: 'post' }) : null}
    >
      <Text size="mini" weight="medium" color="white">
        {errorLabel}
      </Text>
    </Link>
  </div>
);

const PostErrorBanner = ({
  dragging,
  error,
  errorLink,
  errorLabel,
  errorAction,
}) => (
  <div style={errorWrapperStyle(dragging)}>
    <div style={errorMessageStyle(errorLink)}>
      <Text size="mini" weight="medium" color="white">
        {error}
      </Text>
    </div>
    {(errorLink || errorAction) &&
      renderLinkButton({ errorLink, errorLabel, errorAction })}
  </div>
);

PostErrorBanner.propTypes = {
  error: PropTypes.string,
  errorLink: PropTypes.string,
  errorLabel: PropTypes.string,
  errorAction: PropTypes.func,
  dragging: PropTypes.bool,
};

PostErrorBanner.defaultProps = {
  error: null,
  errorLink: null,
  errorLabel: 'Learn More',
  errorAction: null,
};

export default PostErrorBanner;
