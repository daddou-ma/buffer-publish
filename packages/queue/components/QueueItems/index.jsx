import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { WithFeatureLoader } from '@bufferapp/product-features';
import { Button, Text } from '@bufferapp/ui';
import { Link } from '@bufferapp/components';
import { calculateStyles } from '@bufferapp/components/lib/utils';
import {
  transitionAnimationTime,
  transitionAnimationType,
} from '@bufferapp/components/style/animation';
import {
  Post,
  PostDragWrapper,
  QueueButtonGroup,
} from '@bufferapp/publish-shared-components';

import PostEmptySlot from '@bufferapp/publish-shared-components/PostEmptySlot/dropTarget';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';
import FailedPostComponent from '@bufferapp/publish-web/components/ErrorBoundary/failedPostComponent';
import { noScheduledDate } from '../../util';

const ErrorBoundary = getErrorBoundary(true);

const listHeaderStyle = {
  marginBottom: '1rem',
  marginTop: '1rem',
  display: 'flex',
  alignItems: 'center',
};

const calendarBtnWrapperStyle = {
  textAlign: 'center',
  margin: '24px 0px',
};

const headerTextStyle = {
  display: 'flex',
  alignItems: 'baseline',
};

const headerTextDayOfWeekStyle = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 'bold',
  lineHeight: 'normal',
  fontSize: '18px',
  color: '#3D3D3D',
};

const headerTextDateStyle = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 'normal',
  lineHeight: 'normal',
  fontSize: '14px',
  textTransform: 'uppercase',
  color: '#636363',
  marginLeft: '8px',
};

/* eslint-disable react/prop-types */

const renderPost = ({
  post,
  index,
  subprofiles,
  onRequeueClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  onDropPost,
  onSwapPosts,
  draggable,
  hasFirstCommentFlip,
  hasPushNotifications,
  onSetRemindersClick,
  onCampaignTagClick,
  hasCampaignsFeature,
}) => {
  const campaignId = post.campaignDetails ? post.campaignDetails.id : null;
  const postWithEventHandlers = {
    ...post,
    service_geolocation_name: post.locationName,
    source_url: post.sourceUrl,
    subprofile_id: post.subprofileID,
    service_user_tags: post.userTags,
    key: post.id,
    index,
    postDetails: post.postDetails,
    subprofiles,
    onDeleteConfirmClick: () => onDeleteConfirmClick({ post }),
    onEditClick: () => onEditClick({ post }),
    onShareNowClick: () => onShareNowClick({ post }),
    onImageClick: () => onImageClick({ post }),
    onImageClickNext: () => onImageClickNext({ post }),
    onImageClickPrev: () => onImageClickPrev({ post }),
    onImageClose: () => onImageClose({ post }),
    onRequeueClick: () => onRequeueClick({ post }),
    onCampaignTagClick: () => onCampaignTagClick(campaignId),
    onDropPost,
    onSwapPosts,
    hasFirstCommentFlip,
    hasPushNotifications,
    onSetRemindersClick,
    hasCampaignsFeature,
  };
  const PostComponent = Post;

  const defaultStyle = {
    default: {
      margin: '8px 0 8px',
      transition: `all ${transitionAnimationTime} ${transitionAnimationType}`,
    },
    hidden: {
      opacity: '0.5',
      pointerEvents: 'none',
    },
  };

  const hiddenStyle = {
    hidden: post.isDeleting,
  };

  if (draggable) {
    return (
      <div style={calculateStyles(defaultStyle, hiddenStyle)} key={post.id}>
        <ErrorBoundary
          fallbackComponent={() => (
            <ErrorBoundary
              fallbackComponent={() => (
                <FailedPostComponent
                  key={post.id}
                  post={post}
                  postId={post.id}
                />
              )}
            >
              <PostDragWrapper
                id={post.id}
                index={index}
                postComponent={PostComponent}
                postProps={postWithEventHandlers}
                basic
              />
            </ErrorBoundary>
          )}
        >
          <PostDragWrapper
            id={post.id}
            index={index}
            postComponent={PostComponent}
            postProps={postWithEventHandlers}
          />
        </ErrorBoundary>
      </div>
    );
  }

  return (
    <div style={calculateStyles(defaultStyle, hiddenStyle)} key={post.id}>
      <ErrorBoundary
        fallbackComponent={() => (
          <ErrorBoundary
            fallbackComponent={() => (
              <FailedPostComponent key={post.id} post={post} postId={post.id} />
            )}
          >
            <PostComponent {...postWithEventHandlers} basic />
          </ErrorBoundary>
        )}
      >
        <PostComponent {...postWithEventHandlers} />
      </ErrorBoundary>
    </div>
  );
};

const calendarBtns = ['Day', 'Week', 'Month'];

const getText = text => {
  if (text === noScheduledDate) {
    return (
      <div>
        <span style={{ marginRight: '8px' }}>{text}</span>
        <Link href="settings/posting-schedule" unstyled newTab>
          <span style={{ fontSize: '14px', fontWeight: 'normal' }}>
            (Keen to add some?)
          </span>
        </Link>
      </div>
    );
  }
  return text;
};

const renderHeader = (
  { text, dayOfWeek, date, id },
  features,
  isBusinessAccount,
  onCalendarClick,
  showCalendarBtnGroup
) => (
  <div style={listHeaderStyle} key={id}>
    <div style={headerTextStyle}>
      {dayOfWeek && date ? (
        <React.Fragment>
          <span style={headerTextDayOfWeekStyle}>{dayOfWeek}</span>
          <span style={headerTextDateStyle}>{date}</span>
        </React.Fragment>
      ) : (
        <span style={headerTextDayOfWeekStyle}>{getText(text)}</span>
      )}
    </div>
    {showCalendarBtnGroup && (!features.isFreeUser() || isBusinessAccount) && (
      <div style={{ marginLeft: 'auto' }}>
        <QueueButtonGroup
          buttons={calendarBtns}
          onClick={type => onCalendarClick(type)}
        />
      </div>
    )}
  </div>
);

const renderSlot = ({ id, slot, profileService }, onEmptySlotClick) => (
  <PostEmptySlot
    key={id}
    time={slot.label}
    timestamp={slot.timestamp}
    day={slot.dayText}
    service={profileService}
    onClick={() =>
      onEmptySlotClick({
        dueTime: slot.label,
        profile_service: profileService,
        scheduled_at: slot.timestamp,
        due_at: slot.timestamp,
        pinned: true,
      })
    }
  />
);

/* eslint-enable react/prop-types */

const QueueItems = props => {
  const {
    items,
    onEmptySlotClick,
    onCalendarClick,
    features,
    isBusinessAccount,
    ...propsForPosts
  } = props;
  const itemList = items.map((item, index) => {
    const { queueItemType, ...rest } = item;
    if (queueItemType === 'post') {
      return renderPost({ post: rest, index, ...propsForPosts });
    }
    if (queueItemType === 'header') {
      return renderHeader(
        rest,
        features,
        isBusinessAccount,
        onCalendarClick,
        index === 0
      );
    }
    if (queueItemType === 'slot') {
      return renderSlot(rest, onEmptySlotClick);
    }
    if (
      queueItemType === 'showMorePosts' &&
      (!features.isFreeUser() || isBusinessAccount)
    ) {
      return (
        <div key={rest.id} style={calendarBtnWrapperStyle}>
          <Text type="p">Looking for your other posts?</Text>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type="primary"
              label="View Your Calendar"
              onClick={() => onCalendarClick('month')}
            />
          </div>
        </div>
      );
    }
    return null;
  });
  return <Fragment>{itemList}</Fragment>;
};

QueueItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      queueItemType: PropTypes.string.isRequired,
    })
  ),
  subprofiles: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
    })
  ),
  onCalendarClick: PropTypes.func,
  onDeleteConfirmClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onEmptySlotClick: PropTypes.func,
  onShareNowClick: PropTypes.func,
  onRequeueClick: PropTypes.func,
  onImageClick: PropTypes.func,
  onImageClickNext: PropTypes.func,
  onImageClickPrev: PropTypes.func,
  onImageClose: PropTypes.func,
  onDropPost: PropTypes.func,
  onSwapPosts: PropTypes.func,
  draggable: PropTypes.bool,
};

QueueItems.defaultProps = {
  items: [],
  subprofiles: [],
  draggable: false,
};

export default WithFeatureLoader(QueueItems);
