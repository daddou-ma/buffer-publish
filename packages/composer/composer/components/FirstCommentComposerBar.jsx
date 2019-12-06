import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { ProTag } from '@bufferapp/publish-shared-components'; // @todo: show for upsell?
import HashtagIcon from '@bufferapp/ui/Icon/Icons/Hashtag';
import { Tooltip } from '@bufferapp/ui';
import TextareaAutosize from 'react-textarea-autosize';

import CharacterCount from './CharacterCount';

const CommentCharacterCount = styled(CharacterCount)`
  display: inline-block;
  background-color: #e6ebef;
  border-radius: 3px;
  padding: 3px 3px;
  line-height: 12px;
`;

const Wrapper = styled.div`
  position: relative;
  clear: left;
  display: flex;
  margin: 11px 6px 3px 0;
`;

const HashTagIconButton = styled.button`
  position: absolute;
  cursor: pointer;
  top: 7px;
  right: 2px;
  border: 0;
  background: none;
  color: #b8b8b8;

  &:hover {
    color: #333;
  }

  &:focus {
    outline: none;
  }
`;

const Label = styled.label`
  position: relative;
  font-weight: 600;
  font-size: 12px;
  color: #343e47;
  width: 125px;
  padding: 6px 28px 0 10px;
`;

const Textarea = styled(TextareaAutosize)`
  resize: none;
  border: 1px solid #e6ebef;
  border-radius: 3px;
  padding: 8px
    ${({ shouldDisplayHashtagManager }) =>
      shouldDisplayHashtagManager ? '30px' : '10px'}
    8px ${({ shouldDisplayProTag }) => (shouldDisplayProTag ? '54px' : '8px')};
  width: 100%;
  font-size: 12px;
  font-weight: 500;
  box-sizing: border-box;
  font-family: inherit;
  &:focus {
    border: 1px solid #2d99ec;
    outline: none;
  }
  ${({ shouldDisplayProTag }) =>
    shouldDisplayProTag
      ? css`
          background: #f3f3f3;
          cursor: pointer;
        `
      : ''};
`;

const ProTagWrapper = styled.div`
  position: absolute;
  left: 143px;
  top: 9px;
  pointer-events: none;
`;

const FirstCommentComposerBar = ({
  draft,
  onToggleSidebarVisibility,
  onCommentChange,
  onCommentClick,
  shouldDisplayProTag,
  shouldDisplayHashtagManager,
  shouldShowCommentCharacterCount,
}) => (
  <Wrapper>
    {shouldDisplayHashtagManager && (
      <HashTagIconButton
        type="button"
        onClick={e =>
          onToggleSidebarVisibility(e, !draft.composerSidebarVisible)
        }
        tabIndex={0}
      >
        <Tooltip label="Hashtag Manager" position="top">
          <HashtagIcon size="medium" />
        </Tooltip>
      </HashTagIconButton>
    )}
    <Label>
      First Comment{' '}
      {shouldShowCommentCharacterCount && (
        <CommentCharacterCount
          count={draft.characterCommentCount}
          maxCount={draft.service.commentCharLimit}
        />
      )}
    </Label>
    {shouldDisplayProTag && (
      <ProTagWrapper>
        <ProTag />
      </ProTagWrapper>
    )}
    <Textarea
      placeholder="Your comment"
      value={shouldDisplayProTag ? '' : draft.commentText}
      onChange={e => {
        if (!shouldDisplayProTag) onCommentChange(e);
      }}
      onClick={onCommentClick}
      shouldDisplayHashtagManager={shouldDisplayHashtagManager}
      shouldDisplayProTag={shouldDisplayProTag}
    />
  </Wrapper>
);

FirstCommentComposerBar.propTypes = {
  draft: PropTypes.shape({
    commentEnabled: PropTypes.bool,
    composerSidebarVisible: PropTypes.bool,
    commentText: PropTypes.string,
    characterCommentCount: PropTypes.number,
    service: PropTypes.shape({
      commentCharLimit: PropTypes.number,
    }),
  }).isRequired,
  onToggleSidebarVisibility: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  onCommentClick: PropTypes.func.isRequired,
  shouldDisplayProTag: PropTypes.bool.isRequired,
  shouldDisplayHashtagManager: PropTypes.bool.isRequired,
  shouldShowCommentCharacterCount: PropTypes.bool.isRequired,
};

export default FirstCommentComposerBar;
