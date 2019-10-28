import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledImageLabel = styled.div`
  position: absolute;
  left: ${({ tag }) => tag.clientX}px;
  top: ${({ tag }) => tag.clientY}px;
  color: white;
  background-color: black;
  border-radius: 7%;
  padding: 2px 5px;
  opacity: 0.7;
  display: ${({ showTags }) => (showTags ? 'block' : 'none')};
`;

const ImageLabel = ({ tag, showTags }) => (
  <StyledImageLabel tag={tag} showTags={showTags}>
    {tag.username}
  </StyledImageLabel>
);

ImageLabel.propTypes = {
  tag: PropTypes.shape({
    username: PropTypes.string,
    x: PropTypes.string,
    y: PropTypes.string,
  }).isRequired,
  showTags: PropTypes.bool.isRequired,
};

export default ImageLabel;
