import React from 'react';
import PropTypes from 'prop-types';
import { WithFeatureLoader } from '@bufferapp/product-features';
import { Button, Text } from '@bufferapp/ui';

import Header from './Header';
import EmptySlot from './EmptySlot';
import PostContent from './PostContent';
import { ShowMorePostsWrapper, ViewCalendarWrapper } from './styles';

const isPaidUser = ({ features, isBusinessAccount }) =>
  !features.isFreeUser() || isBusinessAccount;

// eslint-disable-next-line react/prop-types
const ShowMorePosts = ({ onCalendarClick }) => (
  <ShowMorePostsWrapper>
    <Text type="p">Looking for your other posts?</Text>
    <ViewCalendarWrapper>
      <Button
        type="primary"
        label="View Your Calendar"
        onClick={() => onCalendarClick('month')}
      />
    </ViewCalendarWrapper>
  </ShowMorePostsWrapper>
);

const QueueItems = ({
  items,
  type,
  features,
  isMainQueue,
  isBusinessAccount,
  onEmptySlotClick,
  onCalendarClick,
  shouldRenderCalendarButtons,
  showAnalyzeBannerAfterFirstPost,
  ...propsForPosts
}) => {
  return items.map((item, index) => {
    const { queueItemType, slot, ...rest } = item;
    const isUserPaid = isPaidUser({ features, isBusinessAccount });

    let QueueSection = null;

    switch (queueItemType) {
      case 'header':
        QueueSection = (
          <Header
            key={item.id}
            item={rest}
            index={index}
            onCalendarClick={onCalendarClick}
            shouldRenderCalendarButtons={
              shouldRenderCalendarButtons && isUserPaid
            }
          />
        );
        break;
      case 'post': {
        const shouldShowAnalyzeBanner =
          showAnalyzeBannerAfterFirstPost && index === 1;

        QueueSection = (
          <PostContent
            key={item.id}
            index={index}
            post={rest}
            queueType={type}
            isUserPaid={isUserPaid}
            shouldShowAnalyzeBanner={shouldShowAnalyzeBanner}
            {...propsForPosts}
          />
        );
        break;
      }
      case 'slot': {
        const isStories = type === 'stories';
        QueueSection = (
          <EmptySlot
            key={item.id}
            item={item}
            pinned={isMainQueue}
            customLabel={isStories && 'Add to Story'}
            customHoverMessage={isStories && 'Schedule a Story'}
            onEmptySlotClick={onEmptySlotClick}
          />
        );
        break;
      }
      case 'showMorePosts':
        QueueSection = isUserPaid && (
          <ShowMorePosts key={rest.id} onCalendarClick={onCalendarClick} />
        );
        break;
      default:
        break;
    }

    return QueueSection;
  });
};

QueueItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    })
  ),
  features: PropTypes.shape({
    isFreeUser: () => {},
  }).isRequired,
  type: PropTypes.string,
  isBusinessAccount: PropTypes.bool,
  shouldRenderCalendarButtons: PropTypes.bool,
  showAnalyzeBannerAfterFirstPost: PropTypes.bool,
  onEmptySlotClick: PropTypes.func,
  onCalendarClick: PropTypes.func,
};

QueueItems.defaultProps = {
  items: [],
  isBusinessAccount: false,
  shouldRenderCalendarButtons: false,
  type: 'post',
  onEmptySlotClick: () => {},
  onCalendarClick: () => {},
};

export default WithFeatureLoader(QueueItems);
