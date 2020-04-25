import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ImgDataContainer = styled.span`
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 1;
  :hover {
    z-index: 2;
  }
`;

const ThumbnailInfoText = styled.div`
  opacity: 0;
  transition: opacity 0.4s;
  position: relative;
  background: #323b43;
  padding: 2px 5px 2px 2px;
  border-radius: 3px;
  ${ImgDataContainer}:hover {
    opacity: 1;
  }
`;

const MediaIconStyled = styled.div`
  display: inline-block;
  margin-left: 4px;
  margin-right: 4px;
  color: white;
  :before {
    font-size: 12px;
  }
`;

const ThumbnailInfo = styled.div`
  position: absolute;
  bottom: 4px;
  left: 0;
  display: inline-block;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  line-height: 17px;
  padding: 0 5px;
  border-radius: 3px;
  overflow: hidden;
`

const SuggestedMediaThumbnailInfo = ({ width, height }) => {
  return (
    <ImgDataContainer>
      <ThumbnailInfo>
        <ThumbnailInfoText>
          <MediaIconStyled className="bi bi-image" />
          {width} × {height}
        </ThumbnailInfoText>
      </ThumbnailInfo>
    </ImgDataContainer>
  );
};

SuggestedMediaThumbnailInfo.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default SuggestedMediaThumbnailInfo;
