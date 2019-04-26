import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FeatureLoader from '@bufferapp/product-features';
import { Button, Text } from '@bufferapp/components';
import { calculateStyles } from '@bufferapp/components/lib/utils';
import {
  transitionAnimationTime,
  transitionAnimationType,
} from '@bufferapp/components/style/animation';

import {
  TextPost,
  ImagePost,
  MultipleImagesPost,
  LinkPost,
  VideoPost,
  PostDragWrapper,
  QueueButtonGroup,
} from '@bufferapp/publish-shared-components';

import PostEmptySlot from '@bufferapp/publish-shared-components/PostEmptySlot/dropTarget';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';
import FailedPostComponent from '@bufferapp/publish-web/components/ErrorBoundary/failedPostComponent';

const ErrorBoundary = getErrorBoundary(true);

const listHeaderStyle = {
  marginBottom: '1rem',
  marginTop: '1rem',
  // marginLeft: '0.5rem',
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

const postTypeComponentMap = new Map([
  ['text', TextPost],
  ['image', ImagePost],
  ['multipleImage', MultipleImagesPost],
  ['link', LinkPost],
  ['video', VideoPost],
]);

/* eslint-disable react/prop-types */

const renderPost = ({
  post,
  subprofiles,
  onCancelConfirmClick,
  onRequeueClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  onDropPost,
  draggable,
  hasFirstCommentFlip,
}) => {
  const postWithEventHandlers = {
    ...post,
    key: post.id,
    postDetails: post.postDetails,
    subprofiles,
    onCancelConfirmClick: () => onCancelConfirmClick({ post }),
    onDeleteClick: () => onDeleteClick({ post }),
    onDeleteConfirmClick: () => onDeleteConfirmClick({ post }),
    onEditClick: () => onEditClick({ post }),
    onShareNowClick: () => onShareNowClick({ post }),
    onImageClick: () => onImageClick({ post }),
    onImageClickNext: () => onImageClickNext({ post }),
    onImageClickPrev: () => onImageClickPrev({ post }),
    onImageClose: () => onImageClose({ post }),
    onRequeueClick: () => onRequeueClick({ post }),
    onDropPost,
    hasFirstCommentFlip,
  };
  let PostComponent = postTypeComponentMap.get(post.type);
  PostComponent = PostComponent || TextPost;

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
                index={post.index}
                postComponent={PostComponent}
                postProps={postWithEventHandlers}
                basic
              />
            </ErrorBoundary>
          )}
        >
          <PostDragWrapper
            id={post.id}
            index={post.index}
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
        fallbackComponent={() =>
          <ErrorBoundary
            fallbackComponent={() => (
              <FailedPostComponent
                key={post.id}
                post={post}
                postId={post.id}
              />
            )}
          >
            <PostComponent {...postWithEventHandlers} basic />
          </ErrorBoundary>
        }
      >
        <PostComponent {...postWithEventHandlers} />
      </ErrorBoundary>
    </div>
  );
};

const calendarBtns = ['Day', 'Week', 'Month'];

const renderHeader = (
  { text, dayOfWeek, date, id },
  onCalendarClick,
  showCalendarBtnGroup,
) => (
  <div style={listHeaderStyle} key={id}>
    <div style={headerTextStyle}>
      {(dayOfWeek && date)
        ? (<React.Fragment>
          <span style={headerTextDayOfWeekStyle}>{dayOfWeek}</span>
          <span style={headerTextDateStyle}>{date}</span>
        </React.Fragment>)
        : <span style={headerTextDayOfWeekStyle}>{text}</span>
      }
    </div>
    {showCalendarBtnGroup && (
      <FeatureLoader supportedPlans={['pro', 'business']}>
        <div style={{ marginLeft: 'auto' }}>
          <QueueButtonGroup
            buttons={calendarBtns}
            onClick={type => onCalendarClick(type, `daily_view_type_buttons_click_${type}`)}
          />
        </div>
      </FeatureLoader>
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

const QueueItems = (props) => {
  const {
    items,
    onEmptySlotClick,
    onCalendarClick,
    ...propsForPosts
  } = props;
  const itemList = items.map((item, index) => {
    const { queueItemType, ...rest } = item;
    if (queueItemType === 'post') {
      return renderPost({ post: rest, ...propsForPosts });
    }
    if (queueItemType === 'header') {
      return renderHeader(rest, onCalendarClick, index === 0);
    }
    if (queueItemType === 'slot') {
      return renderSlot(rest, onEmptySlotClick);
    }
    if (queueItemType === 'showMorePosts') {
      return (
        <FeatureLoader supportedPlans={['pro', 'business']}>
          <div key={rest.id} style={calendarBtnWrapperStyle}>
            <Text>Looking for your other posts?&nbsp;&nbsp;</Text>
            <Button onClick={() => onCalendarClick('month', 'daily_view_show_more_view_calendar')}>
            View Your Calendar
            </Button>
          </div>
        </FeatureLoader>
      );
    }
    return null;
  });
  return (
    <Fragment>
      {itemList}
    </Fragment>
  );
};

QueueItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      queueItemType: PropTypes.string.isRequired,
    }),
  ),
  subprofiles: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
    }),
  ),
  onCalendarClick: PropTypes.func,
  onCancelConfirmClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
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
  draggable: PropTypes.bool,
};

QueueItems.defaultProps = {
  items: [],
  subprofiles: [],
  draggable: false,
};

export default QueueItems;
