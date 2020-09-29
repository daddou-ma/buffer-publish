import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, Button, Link } from '@bufferapp/ui';
import { Checklist } from '@bufferapp/publish-shared-components';
import { useTranslation } from 'react-i18next';

const EmptyStateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 48px;
`;

const Content = styled.div`
  margin-top: 43px;
  flex: 1;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 89.5vh;
  object-fit: cover;
  object-position: 0 0;
  flex: 2;
  margin-left: 50px;
  overflow: hidden;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.12);
  margin-top: 34px;

  @media (min-width: 1500px) {
    flex: 1.5;
  }
`;

const LinkWithStyles = styled(Link)`
  display: inline-block;
  padding: 16px;
`;

const EmptyState = ({
  onOpenCreateCampaignClick,
  showCampaignActions,
  ownerEmail,
  shouldDisplayLockedCopy,
}) => {
  const { t } = useTranslation();
  const nonActionCopy = shouldDisplayLockedCopy
    ? t('campaigns.emptyState.locked', { email: ownerEmail })
    : t('campaigns.emptyState.permission', { email: ownerEmail });
  return (
    <EmptyStateContainer>
      <Content>
        <Text type="h1">{t('campaigns.emptyState.title')}</Text>
        {showCampaignActions ? (
          <>
            <Text type="p">{t('campaigns.emptyState.subtext')}</Text>
            <Checklist
              items={[
                t('campaigns.emptyState.item1'),
                t('campaigns.emptyState.item2'),
                t('campaigns.emptyState.item3'),
              ]}
            />
            <div style={{ alignSelf: 'flex-end', paddingTop: '30px' }}>
              <Button
                type="primary"
                size="large"
                label={t('campaigns.common.createCampaign')}
                onClick={onOpenCreateCampaignClick}
              />
              <LinkWithStyles
                href="https://support.buffer.com/hc/en-us/articles/360046266313-creating-and-managing-campaigns"
                newTab
              >
                {t('campaigns.emptyState.learnMore')}
              </LinkWithStyles>
            </div>
          </>
        ) : (
          <Text type="p">{nonActionCopy}</Text>
        )}
      </Content>
      <Image
        src="https://buffer-publish.s3.amazonaws.com/images/campaigns-empty-state-screenshot.png"
        alt={t('campaigns.emptyState.imageTag')}
      />
    </EmptyStateContainer>
  );
};

EmptyState.propTypes = {
  onOpenCreateCampaignClick: PropTypes.func.isRequired,
  showCampaignActions: PropTypes.bool.isRequired,
  shouldDisplayLockedCopy: PropTypes.bool.isRequired,
  ownerEmail: PropTypes.string,
};

EmptyState.defaultProps = {
  ownerEmail: 'the owner',
};

export default EmptyState;
