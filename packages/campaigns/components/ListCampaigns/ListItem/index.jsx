import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, Button } from '@bufferapp/ui';
import { grayDark } from '@bufferapp/ui/style/colors';

import ClockIcon from '@bufferapp/ui/Icon/Icons/Clock';
import ListIcon from '@bufferapp/ui/Icon/Icons/List';
import CalendarIcon from '@bufferapp/ui/Icon/Icons/Calendar';
import { getURL } from '@bufferapp/publish-server/formatters/src';

const Color = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 10px;
  margin-top: 7px;
`;

const Container = styled.li`
  background-color: ${props => (props.isEvenItem ? 'auto' : '#F5F5F5')};
  display: grid;
  grid-template-columns: 2fr 1fr 1fr .8fr 1fr;
  grid-column-gap: 20px;
  padding: 16px;
  border-radius: 4px;
`;

const LastUpdated = styled.span`
  color: ${grayDark};
`;

const Title = styled.div`
  h3,
  p {
    margin: 0px;
  }
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  p {
    font-weight: 500;
  }
`;

const Icon = styled.span`
  margin-right: 7px;
  svg {
    vertical-align: middle;
  }
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  p {
    margin-top: 0px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const goToAnalyzeReport = () =>
  window.location.assign(`${getURL.getAnalyzeReport()}`);

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

  if (!isUsingPublishAsTeamMember) {
    selectItems.unshift({
      title: translations.viewCampaign,
      selectedItemClick: () => {
        onViewCampaignClick(campaignId);
      },
    });
  }

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
        {campaign.hasPosts ? (
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
        <Text type="p">{campaign.scheduled}</Text>
      </Group>
      <Group>
        <Icon>
          <ListIcon size="medium" />
        </Icon>
        <Text type="p">{campaign.sent}</Text>
      </Group>
      <ButtonWrapper>
        <Button
          onClick={
            isUsingPublishAsTeamMember
              ? () => {
                  onViewCampaignClick(campaignId);
                }
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
          items={selectItems}
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
  hasPosts: PropTypes.bool.isRequired,
  isUsingPublishAsTeamMember: PropTypes.bool.isRequired,
  isEvenItem: PropTypes.bool.isRequired,
};

export default ListItem;
