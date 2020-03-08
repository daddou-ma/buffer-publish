import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/ui';

import ClockIcon from '@bufferapp/ui/Icon/Icons/Clock';
import ListIcon from '@bufferapp/ui/Icon/Icons/List';
import CalendarIcon from '@bufferapp/ui/Icon/Icons/Calendar';
import { getURL } from '@bufferapp/publish-server/formatters/src';

import {
  Container,
  LeftWrapper,
  Color,
  Icon,
  LastUpdated,
  Title,
  Group,
  ButtonWrapper,
} from './style';

const goToAnalyzeReport = () =>
  window.location.assign(`${getURL.getAnalyzeReportUrl()}`);

const ListItem = ({
  translations,
  campaign,
  onViewCampaignClick,
  onDeleteCampaignClick,
  onEditCampaignClick,
  isUsingPublishAsTeamMember,
  isEvenItem,
}) => {
  const { campaignId } = campaign;
  const selectItems = [
    {
      title: translations.editCampaign,
      selectedItemClick: () => {
        onEditCampaignClick(campaignId);
      },
    },
    {
      title: translations.deleteCampaign,
      selectedItemClick: () => {
        onDeleteCampaignClick(campaignId);
      },
    },
  ];

  const viewCampaignSelectItem = {
    title: translations.viewCampaign,
    selectedItemClick: () => {
      onViewCampaignClick(campaignId);
    },
  };

  return (
    <Container isEvenItem={isEvenItem}>
      <LeftWrapper>
        <Color color={campaign.color} />
        <Title>
          <Text type="h3">{campaign.name}</Text>
          <Text type="p">
            <LastUpdated>{campaign.lastUpdated}</LastUpdated>
          </Text>
        </Title>
      </LeftWrapper>
      <Group>
        {campaign.dateRange ? (
          <React.Fragment>
            <Icon>
              <CalendarIcon size="medium" />
            </Icon>
            <Text type="p">{campaign.dateRange}</Text>
          </React.Fragment>
        ) : (
          ''
        )}
      </Group>
      <Group>
        <Icon>
          <ClockIcon size="medium" />
        </Icon>
        <Text type="p">{campaign.scheduled} Scheduled</Text>
      </Group>
      <Group>
        <Icon>
          <ListIcon size="medium" />
        </Icon>
        <Text type="p">{campaign.sent} Sent</Text>
      </Group>
      <ButtonWrapper>
        <Button
          onClick={
            isUsingPublishAsTeamMember
              ? viewCampaignSelectItem.selectedItemClick
              : goToAnalyzeReport
          }
          type="secondary"
          isSplit
          label={
            isUsingPublishAsTeamMember
              ? translations.viewCampaign
              : translations.viewReport
          }
          onSelectClick={selectedItem => {
            if (typeof selectedItem.selectedItemClick !== 'undefined') {
              selectedItem.selectedItemClick();
            }
            return false;
          }}
          items={
            isUsingPublishAsTeamMember
              ? selectItems
              : [viewCampaignSelectItem, ...selectItems]
          }
        />
      </ButtonWrapper>
    </Container>
  );
};

ListItem.propTypes = {
  translations: PropTypes.shape({
    viewReport: PropTypes.string,
    viewCampaign: PropTypes.string,
    editCampaign: PropTypes.string,
    deleteCampaign: PropTypes.string,
  }).isRequired,
  campaign: PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string,
    sent: PropTypes.string,
    scheduled: PropTypes.number,
    lastUpdated: PropTypes.string,
    dateRange: PropTypes.string,
    campaignId: PropTypes.string,
  }).isRequired,
  onViewCampaignClick: PropTypes.func.isRequired,
  onDeleteCampaignClick: PropTypes.func.isRequired,
  onEditCampaignClick: PropTypes.func.isRequired,
  isUsingPublishAsTeamMember: PropTypes.bool.isRequired,
  isEvenItem: PropTypes.bool.isRequired,
};

export default ListItem;
