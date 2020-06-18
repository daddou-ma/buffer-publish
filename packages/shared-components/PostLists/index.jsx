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
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onCampaignTagClick,
  onDropPost,
  onSwapPosts,
  isSent,
  isBusinessAccount,
  isPastReminder,
  hasFirstCommentFlip,
  hasCampaignsFeature,
  userData,
  onPreviewClick,
  profileService,
  profileServiceType,
}) => {
  const campaignId = item.campaignDetails?.id ?? null;
  const postWithEventHandlers = {
    ...item,
    service_geolocation_name: item.locationName,
    source_url: item.sourceUrl,
    subprofile_id: item.subprofileID,
    service_user_tags: item.userTags,
    key: item.id,
    onDeleteConfirmClick: () => onDeleteConfirmClick({ item }),
    onEditClick: () => onEditClick({ item }),
    onShareNowClick: () => onShareNowClick({ item }),
    onCampaignTagClick: () => onCampaignTagClick(campaignId),
    onDropPost,
    onSwapPosts,
    isSent,
    isBusinessAccount,
    isPastReminder,
    hasFirstCommentFlip,
    hasCampaignsFeature,
    userData,
    onPreviewClick,
    profileService,
    profileServiceType,
  };
  const PostComponent = item.type === 'storyGroup' ? Story : Post;

  return <PostComponent {...postWithEventHandlers} />;
};

/* eslint-enable react/prop-types */

const PostLists = ({
  items,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onCampaignTagClick,
  onDropPost,
  onSwapPosts,
  onShareAgainClick,
  onMobileClick,
  isSent,
  isManager,
  isPastReminder,
  isBusinessAccount,
  hasFirstCommentFlip,
  hasCampaignsFeature,
  userData,
  onPreviewClick,
  showAnalyzeBannerAfterFirstPost,
  isAnalyzeCustomer,
  profileService,
  profileServiceType,
  features,
}) => {
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
      const shouldShowAnalyzeBanner =
        showAnalyzeBannerAfterFirstPost && index === 1;
      // return renderPost({ post: rest, index, ...propsForPosts });
      return (
        <>
          <PostStyle
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
            {renderPost({
              item,
              onDeleteConfirmClick,
              onEditClick,
              onShareNowClick,
              onCampaignTagClick,
              onDropPost,
              onSwapPosts,
              onShareAgainClick,
              isSent,
              isBusinessAccount,
              isPastReminder,
              hasFirstCommentFlip,
              hasCampaignsFeature,
              userData,
              onPreviewClick,
              profileService,
              profileServiceType,
            })}
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
    }
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
  onDeleteConfirmClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onShareNowClick: PropTypes.func,
  onCampaignTagClick: PropTypes.func,
  onDropPost: PropTypes.func,
  onSwapPosts: PropTypes.func,
  onShareAgainClick: PropTypes.func,
  onMobileClick: PropTypes.func,
  onPreviewClick: PropTypes.func,
  isSent: PropTypes.bool,
  isManager: PropTypes.bool,
  isPastReminder: PropTypes.bool,
  isBusinessAccount: PropTypes.bool,
  hasFirstCommentFlip: PropTypes.bool,
  hasCampaignsFeature: PropTypes.bool,
  showAnalyzeBannerAfterFirstPost: PropTypes.bool,
  isAnalyzeCustomer: PropTypes.bool,
};

PostLists.defaultProps = {
  showAnalyzeBannerAfterFirstPost: false,
  isAnalyzeCustomer: false,
  hasCampaignsFeature: false,
  hasFirstCommentFlip: false,
  isPastReminder: false,
  isSent: false,
  isManager: false,
  isBusinessAccount: false,
  onDeleteConfirmClick: () => {},
  onEditClick: () => {},
  onShareNowClick: () => {},
  onCampaignTagClick: () => {},
  onDropPost: () => {},
  onSwapPosts: () => {},
  onShareAgainClick: () => {},
  onMobileClick: () => {},
  onPreviewClick: () => {},
};

export default WithFeatureLoader(PostLists);
