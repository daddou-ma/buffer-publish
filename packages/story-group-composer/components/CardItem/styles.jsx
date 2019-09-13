import styled from 'styled-components';
import { CirclePlayIcon } from '@bufferapp/components';
import { grayLighter } from '@bufferapp/ui/style/colors';
import React from 'react';

export const CoverImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const IconWrapper = styled(CirclePlayIcon)`
  display: flex;
  opacity: 0.8;
`;

export const PlayIcon = () => (
  <IconWrapper>
    <CirclePlayIcon color={grayLighter} size={{ width: '40px' }} />
  </IconWrapper>
);

export const UploadingVideo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
