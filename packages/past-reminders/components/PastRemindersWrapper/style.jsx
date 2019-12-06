import React from 'react';
import styled from 'styled-components';
import { LoadingAnimation } from '@bufferapp/components';
import { EmptyState } from '@bufferapp/publish-shared-components';

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 5rem;
`;

export const TopBarContainerStyle = styled.div`
  display: flex;
`;

export const ComposerStyle = styled.div`
  flex-grow: 1;
`;

export const Loading = () => (
  <LoadingContainer>
    <LoadingAnimation />
  </LoadingContainer>
);

export const EmptyStateStyled = () => (
  <EmptyState
    title="You haven’t published any posts with this account in the past 30 days!"
    subtitle="Once a post has gone live via Buffer, you can track its performance here to learn what works best with your audience!"
    heroImg="https://s3.amazonaws.com/buffer-publish/images/empty-sent2x.png"
    heroImgSize={{ width: '270px', height: '150px' }}
  />
);
