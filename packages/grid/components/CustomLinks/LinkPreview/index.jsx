import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DEFAULT_COLOR = '#000000';
const WHITE = '#FFFFFF';

export const LinkPreview = styled.div.attrs(props => ({
  style: {
    backgroundColor: `${props.bgColor || DEFAULT_COLOR}`,
    color: `${props.textColor || WHITE}`,
    border: `${
      props.bgColor === WHITE
        ? `1px solid ${DEFAULT_COLOR}`
        : `1px solid ${props.bgColor}`
    }`,
  },
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  width: 285px;
  min-width: 285px;
  height: 40px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: default;
  font-size: 14px;
  line-height: 16px;
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
