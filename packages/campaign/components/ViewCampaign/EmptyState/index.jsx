import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { EmptyState } from '@bufferapp/publish-shared-components';
import ArrowRightIcon from '@bufferapp/ui/Icon/Icons/ArrowRight';
import { useTranslation } from 'react-i18next';
import EmptyCampaignBanner from '../EmptyCampaignBanner';
import ExamplePost from '../ExamplePost';

const EmptyCampaignWrapper = styled.div`
  margin-top: 16px;
`;

const EmptyStateCampaign = ({
  actions,
  sentView,
  campaign,
  hideAnalyzeReport,
}) => {
  const displayEmptyCampaign =
    !sentView && campaign?.scheduled === 0 && campaign?.sent === 0;
  const displayEmptySentPosts = sentView && campaign?.sent === 0;
  const displayAllPostsSent =
    !sentView && campaign?.scheduled === 0 && campaign?.sent > 0;

  const { t } = useTranslation();

  const teamMemberPrimaryAction = {
    label: t('campaigns.viewCampaign.allPostsSent.createCampaign'),
    onClick: actions.onCreateCampaignClick,
  };
  const ownerPrimaryAction = {
    label: t('campaigns.viewCampaign.allPostsSent.viewReport'),
    onClick: () => actions.goToAnalyzeReport(campaign),
    icon: <ArrowRightIcon />,
    iconEnd: true,
  };

  return (
    <main id="main">
      <EmptyCampaignWrapper>
        {displayEmptyCampaign && (
          <>
            <EmptyCampaignBanner
              onCreatePostClick={actions.onCreatePostClick}
            />
            <ExamplePost />
            <ExamplePost />
          </>
        )}
        {displayEmptySentPosts && (
          <EmptyState
            height="100%"
            title={t('campaigns.viewCampaign.emptySentPosts.title')}
            subtitle={t('campaigns.viewCampaign.emptySentPosts.subtitle')}
            heroImg="https://buffer-publish.s3.amazonaws.com/images/campaign-not-sent.png"
          />
        )}
        {displayAllPostsSent && (
          <EmptyState
            height="100%"
            title={t('campaigns.viewCampaign.allPostsSent.title')}
            subtitle={t('campaigns.viewCampaign.allPostsSent.subtitle')}
            heroImg="https://buffer-publish.s3.amazonaws.com/images/campaign-sent-1.png"
            secondaryAction={{
              label: t('campaigns.viewCampaign.allPostsSent.createPost'),
              onClick: actions.onCreatePostClick,
            }}
            primaryAction={
              hideAnalyzeReport ? teamMemberPrimaryAction : ownerPrimaryAction
            }
          />
        )}
      </EmptyCampaignWrapper>
    </main>
  );
};

EmptyStateCampaign.propTypes = {
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
