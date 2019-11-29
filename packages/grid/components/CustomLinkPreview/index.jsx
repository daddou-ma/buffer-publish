import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DEFAULT_COLOR = '#000000';

const LinkPreview = styled.div.attrs({
  style: ({ bgColor, textColor }) => ({
    backgroundColor: bgColor || DEFAULT_COLOR,
    color: textColor || '#FFFFFF',
  }),
})`
  width: 130px;
  height: 35px;
  border-radius: 4px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const CustomLinkPreview = ({ bgColor, textColor, text }) => {
  return (
    <LinkPreview bgColor={bgColor} textColor={textColor}>
      {text}
    </LinkPreview>
  );
};

CustomLinkPreview.propTypes = {
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  text: PropTypes.string,
};

CustomLinkPreview.defaultProps = {
  bgColor: DEFAULT_COLOR,
  textColor: '#FFFFFF',
  text: null,
};

export default CustomLinkPreview;
