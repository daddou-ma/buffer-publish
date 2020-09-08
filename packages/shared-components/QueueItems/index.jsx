import React from 'react';
import PropTypes from 'prop-types';
import { WithFeatureLoader } from '@bufferapp/product-features';

import Header from './Header';
import EmptySlot from './EmptySlot';
import PostContent from './PostContent';

const isPaidUser = ({ features, isBusinessAccount }) =>
  !features.isFreeUser() || isBusinessAccount;

const QueueItems = ({
  items,
  type,
  features,
  pinned,
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
            isFirstItem={index === 0}
            onCalendarClick={onCalendarClick}
            shouldRenderCalendarButtons={shouldRenderCalendarButtons}
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
            isBusinessAccount={isBusinessAccount}
            shouldShowAnalyzeBanner={shouldShowAnalyzeBanner}
            // eslint-disable-next-line react/jsx-props-no-spreading
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
            pinned={pinned}
            customLabel={isStories ? 'Add to Story' : null}
            customHoverMessage={isStories ? 'Schedule a Story' : null}
            onEmptySlotClick={onEmptySlotClick}
          />
        );
        break;
      }
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
