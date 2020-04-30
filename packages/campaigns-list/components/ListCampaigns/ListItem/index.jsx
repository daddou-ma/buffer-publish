import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonWithSkeleton,
  TextWithSkeleton,
} from '@bufferapp/publish-shared-components';
import ClockIcon from '@bufferapp/ui/Icon/Icons/Clock';
import ListIcon from '@bufferapp/ui/Icon/Icons/List';
import CalendarIcon from '@bufferapp/ui/Icon/Icons/Calendar';
import { campaignScheduled } from '@bufferapp/publish-routes';
import { useTranslation } from 'react-i18next';

import {
  ButtonWrapper,
  Color,
  Container,
  Group,
  Icon,
  LeftWrapper,
  NameContainer,
  StyledLink,
} from './style';

const ListItem = ({
  campaign,
  showCampaignActions,
  onEditCampaignClick,
  onDeleteCampaignClick,
  onViewCampaignClick,
  goToAnalyzeReport,
  displaySkeleton,
}) => {
  const { t } = useTranslation();
  const campaignId = campaign.id;
  const selectItems = [
    {
      title: t('campaigns.viewCampaign.viewReport'),
      selectedItemClick: () => {
        goToAnalyzeReport(campaign);
      },
      disabled: !campaign.dateRange,
    },
    {
      title: t('campaigns.viewCampaign.editCampaign'),
      selectedItemClick: () => {
        onEditCampaignClick({ campaignId });
      },
    },
    {
      title: t('campaigns.viewCampaign.deleteCampaign'),
      selectedItemClick: () => {
        onDeleteCampaignClick(campaign);
      },
    },
  ];

  const campaignRoute = campaignScheduled.getRoute({
    campaignId: campaign.id,
  });

  const NameWrapper = displaySkeleton ? NameContainer : StyledLink;

  return (
    <Container>
      <LeftWrapper>
        <NameWrapper to={campaignRoute}>
          <Color color={campaign.color} displaySkeleton={displaySkeleton} />
          <TextWithSkeleton
            type="h3"
            displaySkeleton={displaySkeleton}
            aria-label={displaySkeleton ? t('common.loading') : null}
            color="grayDarker"
          >
            {campaign.name}
          </TextWithSkeleton>
        </NameWrapper>
        <TextWithSkeleton
          type="p"
          displaySkeleton={displaySkeleton}
          aria-label={displaySkeleton ? t('common.loading') : null}
          color="grayDark"
        >
          {campaign.lastUpdated}
        </TextWithSkeleton>
      </LeftWrapper>
      <Group>
        {campaign.dateRange ? (
          <>
            <Icon displaySkeleton={displaySkeleton}>
              <CalendarIcon size="medium" />
            </Icon>
            <TextWithSkeleton type="p" displaySkeleton={displaySkeleton}>
              {campaign.dateRange}
            </TextWithSkeleton>
          </>
        ) : (
          ''
        )}
      </Group>
      <Group>
        <Icon displaySkeleton={displaySkeleton}>
          <ClockIcon size="medium" />
        </Icon>
        <TextWithSkeleton type="p" displaySkeleton={displaySkeleton}>
          {campaign.scheduled}
          {displaySkeleton
            ? 'loading'
            : ` ${t('campaigns.viewCampaign.scheduled')}`}
        </TextWithSkeleton>
      </Group>
      <Group>
        <Icon displaySkeleton={displaySkeleton}>
          <ListIcon size="medium" />
        </Icon>
        <TextWithSkeleton type="p" displaySkeleton={displaySkeleton}>
          {campaign.sent}
          {displaySkeleton ? 'loading' : ` ${t('campaigns.viewCampaign.sent')}`}
        </TextWithSkeleton>
      </Group>
      <ButtonWrapper>
        <ButtonWithSkeleton
          onClick={() => {
            onViewCampaignClick({ campaignId });
          }}
          type="secondary"
          label={t('campaigns.viewCampaign.viewCampaign')}
          disabled={displaySkeleton}
          displaySkeleton={displaySkeleton}
          onSelectClick={selectedItem => selectedItem.selectedItemClick()}
          isSplit={showCampaignActions}
          items={selectItems}
        />
      </ButtonWrapper>
    </Container>
  );
};

ListItem.propTypes = {
  campaign: PropTypes.shape({
    color: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    sent: PropTypes.number,
    scheduled: PropTypes.number,
    lastUpdated: PropTypes.string,
    dateRange: PropTypes.string,
  }).isRequired,
  displaySkeleton: PropTypes.bool,
  onViewCampaignClick: PropTypes.func,
  onDeleteCampaignClick: PropTypes.func,
  onEditCampaignClick: PropTypes.func,
  goToAnalyzeReport: PropTypes.func,
  showCampaignActions: PropTypes.bool.isRequired,
};

ListItem.defaultProps = {
  displaySkeleton: false,
  onViewCampaignClick: () => {},
  onDeleteCampaignClick: () => {},
  onEditCampaignClick: () => {},
  goToAnalyzeReport: () => {},
};

export default ListItem;
