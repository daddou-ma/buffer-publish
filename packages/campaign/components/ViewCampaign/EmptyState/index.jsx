import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { EmptyState } from '@bufferapp/publish-shared-components';
import ArrowRightIcon from '@bufferapp/ui/Icon/Icons/ArrowRight';
import EmptyCampaignBanner from '../EmptyCampaignBanner';
import ExamplePost from '../ExamplePost';

const EmptyCampaignWrapper = styled.div`
  margin-top: 16px;
`;

const EmptyStateCampaign = ({
  translations,
  actions,
  sentView,
  campaign,
  hideAnalyzeReport,
}) => {
  const displayEmptyCampaign =
    !sentView && campaign?.scheduled === 0 && campaign?.sent === 0;
  const displayEmptySentPosts = sentView && campaign?.sent === 0;
  const displayAllPostsSent = campaign?.scheduled === 0 && campaign?.sent > 0;

  const teamMemberPrimaryAction = {
    label: 'Create New Campaign',
    onClick: actions.onCreateCampaignClick,
  };
  const ownerPrimaryAction = {
    label: 'View Report',
    onClick: actions.goToAnalyzeReport,
    icon: <ArrowRightIcon />,
    iconEnd: true,
  };

  return (
    <React.Fragment>
      {displayEmptyCampaign && (
        <EmptyCampaignWrapper>
          <EmptyCampaignBanner
            translations={translations}
            onCreatePostClick={actions.onCreatePostClick}
          />
          <ExamplePost />
          <ExamplePost />
        </EmptyCampaignWrapper>
      )}
      {displayEmptySentPosts && (
        <EmptyState
          height="100%"
          title="Standing by for sent posts..."
          subtitle="Once your scheduled posts are published, you’ll see them here with some basic post analytics."
          heroImg="https://buffer-publish.s3.amazonaws.com/images/campaign-not-sent.png"
        />
      )}
      {displayAllPostsSent && (
        <EmptyState
          height="100%"
          title="Woohoo — everything sent!"
          subtitle="All the content scheduled for this Campaign has been sent."
          heroImg="https://buffer-publish.s3.amazonaws.com/images/campaign-sent-1.png"
          secondaryAction={{
            label: 'Create Post',
            onClick: actions.onCreatePostClick,
          }}
          primaryAction={
            hideAnalyzeReport ? teamMemberPrimaryAction : ownerPrimaryAction
          }
        />
      )}
    </React.Fragment>
  );
};

EmptyStateCampaign.propTypes = {
  translations: PropTypes.shape({
    learnMore: PropTypes.string,
    createPosts: PropTypes.string,
    createPost: PropTypes.string,
    subtext: PropTypes.string,
    title: PropTypes.string,
    editCampaign: PropTypes.string,
    deleteCampaign: PropTypes.string,
  }).isRequired,
  sentView: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    onCreatePostClick: PropTypes.func.isRequired,
    goToAnalyzeReport: PropTypes.func.isRequired,
    onCreateCampaignClick: PropTypes.func.isRequired,
  }).isRequired,
  campaign: PropTypes.shape({
    scheduled: PropTypes.number.isRequired,
    sent: PropTypes.number.isRequired,
  }).isRequired,
  hideAnalyzeReport: PropTypes.bool,
};

EmptyStateCampaign.defaultProps = {
  hideAnalyzeReport: false,
};

export default EmptyStateCampaign;
