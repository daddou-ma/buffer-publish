import React from 'react';
import PropTypes from 'prop-types';
import {
  QueueItems,
  BufferLoading,
} from '@bufferapp/publish-shared-components';
import Empty from '../Empty';
import ComposerPopover from '@bufferapp/publish-composer-popover';
import {
  Input,
} from '@bufferapp/components';

const composerStyle = {
  marginBottom: '1.5rem',
  flexGrow: '1',
};

const topBarContainerStyle = {
  display: 'flex',
};

const loadingContainerStyle = {
  width: '100%',
  height: '100%',
  textAlign: 'center',
  paddingTop: '5rem',
};

const containerStyle = {
  marginRight: '0.5rem',
};

const renderDraftList = ({
  postLists,
  onApproveClick,
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onMoveToDraftsClick,
  onRequestApprovalClick,
  onRescheduleClick,
}) => {
  return (
    <QueueItems
      items={postLists}
      onApproveClick={onApproveClick}
      onCancelConfirmClick={onCancelConfirmClick}
      onDeleteClick={onDeleteClick}
      onDeleteConfirmClick={onDeleteConfirmClick}
      onEditClick={onEditClick}
      onMoveToDraftsClick={onMoveToDraftsClick}
      onRequestApprovalClick={onRequestApprovalClick}
      onRescheduleClick={onRescheduleClick}
      draggable={false}
      type={'drafts'}
    />
  );
};

const renderEmpty = ({
  manager,
  tabId,
}) =>
  <Empty
    isManager={manager}
    view={tabId}
  />;

const DraftList = ({
  total,
  loading,
  postLists,
  manager,
  onApproveClick,
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onMoveToDraftsClick,
  onRequestApprovalClick,
  onRescheduleClick,
  onComposerPlaceholderClick,
  onComposerCreateSuccess,
  showComposer,
  editMode,
  tabId,

}) => {
  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <BufferLoading size={64} />
      </div>
    );
  }

  return (
    <div className={containerStyle}>
      <div style={topBarContainerStyle}>
        {tabId==='drafts' &&
          <div style={composerStyle}>
            {showComposer && !editMode &&
              <ComposerPopover
                type={'drafts'}
                onSave={onComposerCreateSuccess}
                preserveComposerStateOnClose
              />
            }
            <Input
              placeholder={'Create a new draft...'}
              onFocus={onComposerPlaceholderClick}
            />
          </div>
        }
      </div>
      {showComposer && editMode &&
        <ComposerPopover 
          type={'drafts'}
          onSave={onComposerCreateSuccess} 
        />
      }
      {
        postLists.length > 0 ?
        renderDraftList({
          postLists,
          onApproveClick,
          onCancelConfirmClick,
          onDeleteClick,
          onDeleteConfirmClick,
          onEditClick,
          onMoveToDraftsClick,
          onRequestApprovalClick,
          onRescheduleClick,
        }) :
        renderEmpty({
          manager,
          tabId,
        })
      }
    </div>
  );
};

// TODO: these need some <3, they're not complete!
DraftList.propTypes = {
  loading: PropTypes.bool,
  postLists: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
    }),
  ),
  manager: PropTypes.bool,
  total: PropTypes.number,
  onApproveClick: PropTypes.func.isRequired,
  onCancelConfirmClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onDeleteConfirmClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onMoveToDraftsClick: PropTypes.func.isRequired,
  onRequestApprovalClick: PropTypes.func.isRequired,
  onRescheduleClick: PropTypes.func.isRequired,
};

DraftList.defaultProps = {
  loading: true,
};

export default DraftList;
