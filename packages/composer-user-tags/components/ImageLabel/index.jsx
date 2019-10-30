import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledImageLabel = styled.div`
  position: absolute;
  left: ${({ tag }) => `${tag.clientX}%`};
  top: ${({ tag }) => `${tag.clientY}%`};
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 7%;
  padding: 2px 5px;
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
