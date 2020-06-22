/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@bufferapp/ui';
import { WithFeatureLoader } from '@bufferapp/product-features';

import Post from '../Post';
import Story from '../Story';
import QueueHeader from '../QueueHeader';
import BannerAdvancedAnalytics from '../BannerAdvancedAnalytics';

const RemindersButtons = styled.div``;

const ShareAgainWrapper = styled.div`
  padding-left: 1rem;
  padding-bottom: 0.5rem;
  min-width: 146px;
`;

const PostStyle = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${props =>
    props.shouldShowAnalyzeBanner ? '2rem' : '2.5rem'};
`;

const renderPost = ({
  item,
  index,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onCampaignTagClick,
  isBusinessAccount,
  isPastReminder,
  features,
  isManager,
  isAnalyzeCustomer,
  onMobileClick,
  onShareAgainClick,
  showAnalyzeBannerAfterFirstPost,
  ...postProps
}) => {
  const campaignId = item.campaignDetails?.id ?? null;
  const postWithEventHandlers = {
    ...item,
    ...postProps,
    service_geolocation_name: item.locationName,
    source_url: item.sourceUrl,
    subprofile_id: item.subprofileID,
    service_user_tags: item.userTags,
    key: item.id,
    index,
    onDeleteConfirmClick: () => onDeleteConfirmClick({ item }),
    onEditClick: () => onEditClick({ item }),
    onShareNowClick: () => onShareNowClick({ item }),
    onCampaignTagClick: () => onCampaignTagClick(campaignId),
    isBusinessAccount,
    isPastReminder,
  };

  const shouldShowAnalyzeBanner =
    showAnalyzeBannerAfterFirstPost && index === 1;

  const PostComponent = item.type === 'storyGroup' ? Story : Post;

  return (
    <>
      <PostStyle
        key={item.id}
        id={`update-${item.id}`}
        className={[
          'update',
          `post_${item.profile_service}`,
          item.postDetails && item.postDetails.isRetweet
            ? 'is_retweet'
            : 'not_retweet',
        ].join(' ')}
        shouldShowAnalyzeBanner
      >
        <PostComponent {...postWithEventHandlers} />
        {(!features.isFreeUser() || isBusinessAccount) && !isPastReminder && (
          <ShareAgainWrapper>
            <Button
              type="secondary"
              label="Share Again"
              onClick={() => {
                onShareAgainClick({ post: item });
              }}
            />
          </ShareAgainWrapper>
        )}
        {isPastReminder && (
          <RemindersButtons>
            {(!features.isFreeUser() || isBusinessAccount) && (
              <ShareAgainWrapper>
                <Button
                  fullWidth
                  type="secondary"
                  label="Share Again"
                  onClick={() => {
                    onShareAgainClick({ post: item });
                  }}
                />
              </ShareAgainWrapper>
            )}
            {isManager && (
              <ShareAgainWrapper>
                <Button
                  fullWidth
                  type="secondary"
                  label="Send to Mobile"
                  onClick={() => {
                    onMobileClick({ post: item });
                  }}
                />
              </ShareAgainWrapper>
            )}
          </RemindersButtons>
        )}
      </PostStyle>
      {shouldShowAnalyzeBanner && (
        <BannerAdvancedAnalytics isAnalyzeCustomer={isAnalyzeCustomer} />
      )}
    </>
  );
};

/* eslint-enable react/prop-types */

const PostLists = ({ items, ...propsForPosts }) => {
  const itemList = items.map((item, index) => {
    const { queueItemType, ...rest } = item;

    if (queueItemType === 'header') {
      return (
        <QueueHeader
          text={item.text}
          id={item.id}
          dayOfWeek={item.dayOfWeek}
          date={item.date}
        />
      );
    }
    if (queueItemType === 'post') {
      return renderPost({ index, item: rest, ...propsForPosts });
    }

    return null;
  });

  return <>{itemList}</>;
};

PostLists.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      date: PropTypes.string,
      queueItemType: PropTypes.string,
      dayOfWeek: PropTypes.string,
      hasCommentEnabled: PropTypes.bool,
    })
  ).isRequired,
  isBusinessAccount: PropTypes.bool,
  features: PropTypes.shape({
    isFreeUser: () => {},
  }).isRequired,
};

PostLists.defaultProps = {
  isBusinessAccount: false,
};

export default WithFeatureLoader(PostLists);
