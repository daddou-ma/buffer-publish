import React from 'react';
import PropTypes from 'prop-types';
import { LinkifiedText, Text } from '@bufferapp/components';
import Draft from '../Draft';

const postContentStyle = {
  display: 'flex',
};

const postContentTextStyle = {
  paddingRight: '1rem',
  flexGrow: 1,
};

const TextDraft = ({
  hasPermission,
  isConfirmingDelete,
  isDeleting,
  isMoving,
  isPastDue,
  isWorking,
  imageSrc,
  links,
  manager,
  onApproveClick,
  onDeleteConfirmClick,
  onEditClick,
  onMoveToDraftsClick,
  onRequestApprovalClick,
  onRescheduleClick,
  draftDetails,
  text,
  retweetProfile,
  retweetComment,
  retweetCommentLinks,
  scheduledAt,
  view,
  basic,
  hasFirstCommentFlip,
}) => {
  const children = (
    <div style={postContentStyle}>
      <span style={postContentTextStyle}>
        {basic ? (
          <Text size="mini">{text}</Text>
        ) : (
          <LinkifiedText links={links} size="mini" newTab unstyled>
            {text}
          </LinkifiedText>
        )}
      </span>
    </div>
  );

  return (
    <Draft
      hasPermission={hasPermission}
      isConfirmingDelete={isConfirmingDelete}
      isDeleting={isDeleting}
      isMoving={isMoving}
      isPastDue={isPastDue}
      isWorking={isWorking}
      imageSrc={imageSrc}
      links={links}
      manager={manager}
      onApproveClick={onApproveClick}
      onDeleteConfirmClick={onDeleteConfirmClick}
      onEditClick={onEditClick}
      onMoveToDraftsClick={onMoveToDraftsClick}
      onRequestApprovalClick={onRequestApprovalClick}
      onRescheduleClick={onRescheduleClick}
      draftDetails={draftDetails}
      text={text}
      retweetProfile={retweetProfile}
      retweetComment={retweetComment}
      retweetCommentLinks={retweetCommentLinks}
      scheduledAt={scheduledAt}
      view={view}
      basic={basic}
      hasFirstCommentFlip={hasFirstCommentFlip}
    >
      {children}
    </Draft>
  );
};

TextDraft.propTypes = {
  ...Draft.commonPropTypes,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      rawString: PropTypes.string,
      displayString: PropTypes.string,
      expandedUrl: PropTypes.string,
      indices: PropTypes.arrayOf(PropTypes.number),
    })
  ).isRequired,
  retweetCommentLinks: PropTypes.arrayOf(
    PropTypes.shape({
      rawString: PropTypes.string,
      displayString: PropTypes.string,
      expandedUrl: PropTypes.string,
      indices: PropTypes.arrayOf(PropTypes.number),
    })
  ),
  text: PropTypes.string.isRequired,
};

TextDraft.defaultProps = Draft.defaultProps;

export default TextDraft;
