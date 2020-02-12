import React from 'react';
import PropTypes from 'prop-types';
import { Card, LinkifiedText, Text } from '@bufferapp/components';

import { transitionAnimationType } from '@bufferapp/components/style/animation';
import { WithFeatureLoader } from '@bufferapp/product-features';

import PostFooter from '../PostFooter';
import PostStats from '../PostStats';
import UserDetails from '../UserDetails';
import RenderPostMetaBar from './RenderPostMetaBar';
import PostErrorBanner from '../PostErrorBanner';

const getPostContainerStyle = ({ dragging, hovering }) => ({
  display: 'flex',
  width: '100%',
  // boxShadow: (hovering && !dragging) ? '0 2px 4px 0 rgba(0,0,0,0.50)' : 'none',
  transition: `box-shadow 0.1s ${transitionAnimationType}`,
  borderRadius: '4px',
});

const postStyle = {
  flexGrow: 1,
  minWidth: 0,
};

const prefixCSSForBrowser = css => {
  const chrome = navigator.userAgent.indexOf('Chrome') > -1;
  if (chrome) {
    return `-webkit-${css}`;
  }
  const firefox = navigator.userAgent.indexOf('Firefox') > -1;
  if (firefox) {
    return `-moz-${css}`;
  }
  return css;
};

const getPostContentStyle = ({ draggable, dragging }) => ({
  padding: '1rem',
  cursor: draggable ? prefixCSSForBrowser('grab') : 'inherit',
  opacity: dragging ? 0 : 1,
});

const retweetProfileWrapperStyle = {
  marginBottom: '1rem',
};

const commentStyle = {
  marginBottom: '1rem',
};

/* eslint-disable react/prop-types */

const renderRetweetComment = ({
  retweetComment,
  retweetCommentLinks,
  basic,
}) => (
  <div style={commentStyle}>
    {basic ? (
      <Text color="black" size="mini">
        {retweetComment}
      </Text>
    ) : (
      <LinkifiedText
        color="black"
        links={retweetCommentLinks}
        newTab
        size="mini"
        unstyled
      >
        {retweetComment}
      </LinkifiedText>
    )}
  </div>
);

const renderContent = ({
  children,
  retweetComment,
  retweetCommentLinks,
  retweetProfile,
  draggable,
  dragging,
  basic,
}) => {
  if (retweetProfile) {
    return (
      <div style={getPostContentStyle({ draggable, dragging })}>
        {retweetComment
          ? renderRetweetComment({ retweetComment, retweetCommentLinks, basic })
          : ''}
        <Card color="off-white" reducedPadding>
          <div style={retweetProfileWrapperStyle}>
            <UserDetails {...retweetProfile} />
          </div>
          {children}
        </Card>
      </div>
    );
  }

  return (
    <div style={getPostContentStyle({ draggable, dragging })}>{children}</div>
  );
};

const getBorderStyle = ({
  draggingPlaceholder,
  noBorder,
  dragging,
  isOver,
}) => {
  const lineType = draggingPlaceholder ? 'dashed' : 'solid';
  let color = '#b8b8b8';

  if (noBorder) {
    color = 'transparent';
  }

  if (!dragging && isOver) {
    color = '#2C4BFF';
  }

  return `1px ${lineType} ${color}`;
};

const getBDSCardStyle = ({
  faded,
  draggingPlaceholder,
  noBorder,
  dragging,
  isOver,
}) => ({
  background: '#fff',
  border: getBorderStyle({ draggingPlaceholder, noBorder, dragging, isOver }),
  borderRadius: '4px',
  opacity: faded ? '0.5' : '1',
  overflow: 'hidden',
  boxShadow:
    !draggingPlaceholder && !noBorder && '0px 1px 4px rgba(0, 0, 0, 0.16)',
});

const BDSCard = ({
  faded,
  draggingPlaceholder,
  noBorder,
  dragging,
  isOver,
  children,
}) => (
  <div
    style={getBDSCardStyle({
      faded,
      draggingPlaceholder,
      noBorder,
      dragging,
      isOver,
    })}
  >
    {children}
  </div>
);

/* eslint-enable react/prop-types */

const Post = ({
  children,
  isConfirmingDelete,
  isDeleting,
  isWorking,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onRequeueClick,
  postDetails,
  retweetComment,
  retweetCommentLinks,
  retweetProfile,
  locationName,
  sourceUrl,
  subprofileID,
  subprofiles,
  draggable,
  dragging,
  hovering,
  isOver,
  fixed,
  statistics,
  profileService,
  serviceLink,
  isSent,
  isManager,
  isBusinessAccount,
  isPastReminder,
  day,
  dueTime,
  sharedBy,
  commentEnabled,
  commentText,
  hasCommentEnabled,
  hasFirstCommentFlip,
  hasPushNotifications,
  onSetRemindersClick,
  features,
  basic,
  hasUserTags,
}) => {
  const hasError =
    postDetails && postDetails.error && postDetails.error.length > 0;
  const hasReminderError =
    !isSent &&
    !hasError &&
    !hasPushNotifications &&
    postDetails.isInstagramReminder &&
    !isPastReminder;

  return (
    <div style={getPostContainerStyle({ dragging, hovering, isOver })}>
      <div style={postStyle}>
        <BDSCard
          faded={isDeleting}
          noPadding
          draggingPlaceholder={dragging}
          dragging={dragging}
          isOver={isOver}
        >
          {hasReminderError && (
            <PostErrorBanner
              dragging={dragging}
              errorLabel="Set Up Reminders"
              error="Shoot, looks like we can't publish this until you set up Reminders. Would you be up for setting them now?"
              errorAction={onSetRemindersClick}
            />
          )}
          {hasError && (
            <PostErrorBanner
              dragging={dragging}
              error={postDetails.error}
              errorLink={postDetails.errorLink}
            />
          )}
          {renderContent({
            children,
            retweetProfile,
            retweetComment,
            retweetCommentLinks,
            draggable,
            dragging,
            basic,
          })}
          <RenderPostMetaBar
            profileService={profileService}
            dragging={dragging}
            locationName={locationName}
            sourceUrl={sourceUrl}
            subprofileID={subprofileID}
            subprofiles={subprofiles}
            isSent={isSent}
            isPastReminder={isPastReminder}
          />
          <PostFooter
            isManager={isManager}
            isDeleting={isDeleting}
            isConfirmingDelete={isConfirmingDelete}
            isWorking={isWorking}
            onDeleteConfirmClick={onDeleteConfirmClick}
            onEditClick={onEditClick}
            onShareNowClick={onShareNowClick}
            postDetails={postDetails}
            dragging={dragging}
            onRequeueClick={onRequeueClick}
            serviceLink={serviceLink}
            isSent={isSent}
            isPastReminder={isPastReminder}
            day={day}
            dueTime={dueTime}
            sharedBy={sharedBy}
            commentEnabled={commentEnabled}
            commentText={commentText}
            hasCommentEnabled={hasCommentEnabled}
            hasFirstCommentFlip={hasFirstCommentFlip}
            hasUserTags={hasUserTags}
          />
          {(isBusinessAccount || !features.isFreeUser()) &&
            isSent &&
            !postDetails.isRetweet && (
              <PostStats
                showTwitterMentions={
                  !features.isFreeUser() && !features.isProUser()
                }
                statistics={statistics}
                profileService={profileService}
              />
            )}
        </BDSCard>
      </div>
    </div>
  );
};

Post.commonPropTypes = {
  isConfirmingDelete: PropTypes.bool,
  isDeleting: PropTypes.bool,
  isWorking: PropTypes.bool,
  isBusinessAccount: PropTypes.bool,
  onRequeueClick: PropTypes.func,
  onDeleteConfirmClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onShareNowClick: PropTypes.func,
  postDetails: PropTypes.shape({
    isRetweet: PropTypes.bool,
    postAction: PropTypes.string,
    error: PropTypes.string,
  }).isRequired,
  retweetProfile: PropTypes.shape({
    avatarUrl: PropTypes.string,
    handle: PropTypes.string,
    name: PropTypes.string,
  }),
  retweetComment: PropTypes.string,
  retweetCommentLinks: PropTypes.arrayOf(
    PropTypes.shape({
      rawString: PropTypes.string,
      displayString: PropTypes.string,
      expandedUrl: PropTypes.string,
      indices: PropTypes.arrayOf(PropTypes.number),
    })
  ),
  draggable: PropTypes.bool,
  dragging: PropTypes.bool,
  hovering: PropTypes.bool,
  isOver: PropTypes.bool,
  fixed: PropTypes.bool,
  onDropPost: PropTypes.func,
  serviceLink: PropTypes.string,
  isSent: PropTypes.bool,
  isPastReminder: PropTypes.bool,
  day: PropTypes.string,
  dueTime: PropTypes.string,
  sharedBy: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  basic: PropTypes.bool,
};

Post.propTypes = {
  ...Post.commonPropTypes,
  children: PropTypes.node.isRequired,
};

Post.defaultProps = {
  isConfirmingDelete: false,
  isDeleting: false,
  isWorking: false,
  fixed: false,
  isSent: false,
  isBusinessAccount: false,
  isManager: true,
  isPastReminder: false,
  day: null,
  dueTime: null,
  sharedBy: null,
  basic: false,
};

export default WithFeatureLoader(Post);
