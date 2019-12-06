import styled from 'styled-components';
import { CirclePlayIcon } from '@bufferapp/components';
import { grayLighter } from '@bufferapp/ui/style/colors';
import React from 'react';
import PropTypes from 'prop-types';

const IconWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  opacity: 0.8;
  align-items: center;
  justify-content: center;
`;

export const PlayIcon = ({ large }) => (
  <IconWrapper>
    <CirclePlayIcon
      color={grayLighter}
      size={{ width: large ? '60px' : '40px' }}
    />
  </IconWrapper>
);

PlayIcon.propTypes = {
  large: PropTypes.bool,
};

PlayIcon.defaultProps = {
  large: false,
};

export const UploadingVideo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const CoverImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${props => (props.isTarget ? '0.6' : '1')};
`;

export const StoryWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
