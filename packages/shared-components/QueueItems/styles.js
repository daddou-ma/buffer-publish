import styled, { css } from 'styled-components';
import {
  transitionAnimationTime,
  transitionAnimationType,
} from '@bufferapp/components/style/animation';

export const PostWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
  width: 100%;
  transition: all ${transitionAnimationTime} ${transitionAnimationType};

  ${props =>
    props.hidden &&
    css`
      max-height: 0;
      opacity: 0;
    `}
`;

export const ShowMorePostsWrapper = styled.div`
  text-align: center;
  margin: 24px 0px;
`;

export const ViewCalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
