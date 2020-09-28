import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ButtonWithSkeleton,
  TextWithSkeleton,
} from '@bufferapp/publish-shared-components';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import { borderRadius } from '@bufferapp/ui/style/borders';
import { gray, white, grayShadow } from '@bufferapp/ui/style/colors';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import EmptyState from './EmptyState';
import List from './List';
import SkeletonList from './SkeletonList';

/* Styles */
const Wrapper = styled.div`
  padding: 16px 24px;
  height: 100%;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 0px 16px;
`;

const Main = styled.main`
  margin: 0px auto;
  min-width: 800px;
  max-width: 1800px;
  border-radius: ${borderRadius};
  border: 1px solid ${gray};
  background-color: ${white};
  box-shadow: ${grayShadow};

  @media (min-width: 1500px) {
    width: 75vw;
  }
`;

const TextWithSkeletonStyled = styled(TextWithSkeleton)`
  flex-grow: 1;
`;

const ListCampaigns = ({
  campaigns,
  onEditCampaignClick,
  onDeleteCampaignClick,
  onViewCampaignClick,
  goToAnalyzeReport,
  onOpenCreateCampaignClick,
  showCampaignActions,
  hideAnalyzeReport,
  hasCampaignsFlip,
  fetchCampaignsIfNeeded,
  isLoading,
  ownerEmail,
  shouldSeeLockedCopy,
}) => {
  if (!hasCampaignsFlip) {
    window.location = getURL.getPublishUrl();
    return null;
  }
  // Fetch Data
  useEffect(() => {
    fetchCampaignsIfNeeded();
  }, []);

  const { t } = useTranslation();

  if (!isLoading && (!campaigns || campaigns.length === 0)) {
    return (
      <EmptyState
        onOpenCreateCampaignClick={onOpenCreateCampaignClick}
        showCampaignActions={showCampaignActions}
        ownerEmail={ownerEmail}
        shouldSeeLockedCopy={shouldSeeLockedCopy}
      />
    );
  }

  return (
    <Wrapper>
      <Main id="main">
        <Header>
          <TextWithSkeletonStyled
            type="h2"
            displaySkeleton={isLoading}
            aria-label={isLoading ? t('common.loading') : null}
          >
            {t('campaigns.common.title')}
          </TextWithSkeletonStyled>
          {showCampaignActions && (
            <ButtonWithSkeleton
              type="primary"
              label={t('campaigns.common.createCampaign')}
              onClick={onOpenCreateCampaignClick}
              disabled={isLoading}
              displaySkeleton={isLoading}
            />
          )}
        </Header>
        {!isLoading && (
          <List
            campaigns={campaigns}
            onEditCampaignClick={onEditCampaignClick}
            onDeleteCampaignClick={onDeleteCampaignClick}
            onViewCampaignClick={onViewCampaignClick}
            goToAnalyzeReport={goToAnalyzeReport}
            showCampaignActions={showCampaignActions}
            hideAnalyzeReport={hideAnalyzeReport}
          />
        )}
        {isLoading && (
          <SkeletonList showCampaignActions={showCampaignActions} />
        )}
      </Main>
    </Wrapper>
  );
};

ListCampaigns.propTypes = {
  campaigns: PropTypes.array, // eslint-disable-line
  onOpenCreateCampaignClick: PropTypes.func,
  onEditCampaignClick: PropTypes.func,
  onDeleteCampaignClick: PropTypes.func,
  onViewCampaignClick: PropTypes.func,
  goToAnalyzeReport: PropTypes.func,
  showCampaignActions: PropTypes.bool.isRequired,
  hideAnalyzeReport: PropTypes.bool.isRequired,
  hasCampaignsFlip: PropTypes.bool.isRequired,
  fetchCampaignsIfNeeded: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  ownerEmail: PropTypes.string,
  shouldSeeLockedCopy: PropTypes.bool.isRequired,
};

ListCampaigns.defaultProps = {
  onOpenCreateCampaignClick: () => {},
  onEditCampaignClick: () => {},
  onDeleteCampaignClick: () => {},
  onViewCampaignClick: () => {},
  goToAnalyzeReport: () => {},
  ownerEmail: 'the owner',
};

export default ListCampaigns;
