import React from 'react';
import PropTypes from 'prop-types';
import {
  PostLists,
} from '@bufferapp/publish-shared-components';
import ComposerPopover from '@bufferapp/publish-composer-popover';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';
import {
  Loading,
  ComposerStyle,
  EmptyStateStyled,
  TopBarContainerStyle,
} from '../PastRemindersWrapper/style';

const ErrorBoundary = getErrorBoundary(true);

const PastRemindersPosts = ({
  total,
  loading,
  postLists,
  onEditClick,
  onShareAgainClick,
  onMobileClick,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  onComposerCreateSuccess,
  showComposer,
  editMode,
  isManager,
  isBusinessAccount,
}) => {
  if (loading) {
    return (
      <Loading />
    );
  }

  if (total < 1) {
    return (
      <EmptyStateStyled />
    );
  }

  return (
    <ErrorBoundary>
      <React.Fragment>
        {showComposer && !editMode
          && (
            <TopBarContainerStyle>
              <ComposerStyle>
                <ComposerPopover
                  onSave={onComposerCreateSuccess}
                  type="pastReminders"
                />
              </ComposerStyle>
            </TopBarContainerStyle>
          )}
        {showComposer && editMode
          && (
            <ComposerPopover
              onSave={onComposerCreateSuccess}
              type="pastReminders"
            />
          )}
        <PostLists
          postLists={postLists}
          onEditClick={onEditClick}
          onShareAgainClick={onShareAgainClick}
          onMobileClick={onMobileClick}
          onImageClick={onImageClick}
          onImageClickNext={onImageClickNext}
          onImageClickPrev={onImageClickPrev}
          onImageClose={onImageClose}
          isManager={isManager}
          isBusinessAccount={isBusinessAccount}
          isSent={false}
          isPastReminder
        />
      </React.Fragment>
    </ErrorBoundary>
  );
};

PastRemindersPosts.propTypes = {
  loading: PropTypes.bool,
  moreToLoad: PropTypes.bool, // eslint-disable-line
  page: PropTypes.number, // eslint-disable-line
  postLists: PropTypes.arrayOf(
    PropTypes.shape({
      listHeader: PropTypes.string,
      posts: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
        }),
      ),
    }),
  ),
  total: PropTypes.number,
  showComposer: PropTypes.bool,
  editMode: PropTypes.bool,
  onComposerCreateSuccess: PropTypes.func.isRequired,
  onEditClick: PropTypes.func,
  onShareAgainClick: PropTypes.func,
  onMobileClick: PropTypes.func,
  onImageClick: PropTypes.func,
  onImageClickNext: PropTypes.func,
  onImageClickPrev: PropTypes.func,
  onImageClose: PropTypes.func,
  isManager: PropTypes.bool,
  isBusinessAccount: PropTypes.bool,
};

PastRemindersPosts.defaultProps = {
  loading: true,
  moreToLoad: false,
  page: 1,
  postLists: [],
  total: 0,
  showComposer: false,
  editMode: false,
  isManager: true,
  isBusinessAccount: false,
  onEditClick: () => {},
  onShareAgainClick: () => {},
  onMobileClick: () => {},
  onImageClick: () => {},
  onImageClickNext: () => {},
  onImageClickPrev: () => {},
  onImageClose: () => {},
};

export default PastRemindersPosts;
