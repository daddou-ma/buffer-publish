import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  LinkifiedText,
} from '@bufferapp/components';

import {
  transitionAnimationType,
} from '@bufferapp/components/style/animation';

import {
  borderRadius,
} from '@bufferapp/components/style/border';

import FeatureLoader from '@bufferapp/product-features';
import PostFooter from '../PostFooter';
import PostStats from '../PostStats';
import RetweetPanel from '../RetweetPanel';
import RenderPostMetaBar from './RenderPostMetaBar';

const getPostContainerStyle = ({ dragging, hovering }) => ({
  display: 'flex',
  width: '100%',
  boxShadow: (hovering && !dragging) ? '0 2px 4px 0 rgba(0,0,0,0.50)' : 'none',
  transition: `box-shadow 0.1s ${transitionAnimationType}`,
  borderRadius,
});

const postStyle = {
  flexGrow: 1,
  minWidth: 0,
};

const prefixCSSForBrowser = (css) => {
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
}) => (
  <div style={commentStyle}>
    <LinkifiedText
      links={retweetCommentLinks}
      newTab
      size={'mini'}
      unstyled
      color={'black'}
    >
      { retweetComment }
    </LinkifiedText>
  </div>
);

const renderContent = ({
  children,
  retweetComment,
  retweetCommentLinks,
  retweetProfile,
  draggable,
  dragging,
}) => {
  if (retweetProfile) {
    return (
      <div style={getPostContentStyle({ draggable, dragging })}>
        { retweetComment ? renderRetweetComment({ retweetComment, retweetCommentLinks }) : '' }
        <Card
          color={'off-white'}
          reducedPadding
        >
          <div style={retweetProfileWrapperStyle}>
            <RetweetPanel {...retweetProfile} />
          </div>
          { children }
        </Card>
      </div>
    );
  }

  return (
    <div style={getPostContentStyle({ draggable, dragging })}>
      { children }
    </div>
  );
};

/* eslint-enable react/prop-types */

const Post = ({
  children,
  isConfirmingDelete,
  isDeleting,
  isWorking,
  onCancelConfirmClick,
  onDeleteClick,
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
  fixed,
  statistics,
  profileService,
  isSent,
  isManager,
}) =>
  (<div style={getPostContainerStyle({ dragging, hovering })}>
    <div style={postStyle}>
      <Card
        faded={isDeleting}
        noPadding
        draggingPlaceholder={dragging && !fixed}
        noBorder={dragging && fixed}
      >
        {renderContent({
          children,
          retweetProfile,
          retweetComment,
          retweetCommentLinks,
          draggable,
          dragging,
        })}
        <RenderPostMetaBar
          profileService={profileService}
          dragging={dragging}
          locationName={locationName}
          sourceUrl={sourceUrl}
          subprofileID={subprofileID}
          subprofiles={subprofiles}
        />
        <PostFooter
          isManager={isManager}
          isDeleting={isDeleting}
          isConfirmingDelete={isConfirmingDelete}
          isWorking={isWorking}
          onCancelConfirmClick={onCancelConfirmClick}
          onDeleteClick={onDeleteClick}
          onDeleteConfirmClick={onDeleteConfirmClick}
          onEditClick={onEditClick}
          onShareNowClick={onShareNowClick}
          postDetails={postDetails}
          dragging={dragging}
          onRequeueClick={onRequeueClick}
          isSent={isSent}
        />
        <FeatureLoader
          supportedFeatures={'post_stats'}
        >
          {isSent && !postDetails.isRetweet &&
            <PostStats
              statistics={statistics}
              profileService={profileService}
            />
          }
        </FeatureLoader>
      </Card>
    </div>
  </div>);

Post.commonPropTypes = {
  isConfirmingDelete: PropTypes.bool,
  isDeleting: PropTypes.bool,
  isWorking: PropTypes.bool,
  onCancelConfirmClick: PropTypes.func,
  onRequeueClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
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
    }),
  ),
  draggable: PropTypes.bool,
  dragging: PropTypes.bool,
  hovering: PropTypes.bool,
  fixed: PropTypes.bool,
  onDropPost: PropTypes.func,
  isSent: PropTypes.bool,
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
};

export default Post;
