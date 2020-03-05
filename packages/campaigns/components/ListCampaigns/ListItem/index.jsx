import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, Button } from '@bufferapp/ui';
import { grayDark } from '@bufferapp/ui/style/colors';

import ArrowRightIcon from '@bufferapp/ui/Icon/Icons/ArrowRight';
import ClockIcon from '@bufferapp/ui/Icon/Icons/Clock';
import ListIcon from '@bufferapp/ui/Icon/Icons/List';
import CalendarIcon from '@bufferapp/ui/Icon/Icons/Calendar';
import { getURL } from '@bufferapp/publish-server/formatters/src';

export const Container = styled.li`
  display: flex;
  margin: 14px 0px 30px;
  align-items: center;
  width: 100%;
`;

export const Color = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 10px;
  margin-top: 7px;
`;

export const LastUpdated = styled.span`
  color: ${grayDark};
`;

export const SubText = styled.div`
  justify-content: flex-end;
  display: flex;
  margin-top: 8px;
  width: 100%;
  p {
    margin: 0px;
  }
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    margin: 0px;
  }
`;

export const CampaignDetails = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Group = styled.div`
  display: flex;
  margin-right: 60px;
  p {
    font-weight: 500;
  } 
`;

export const Details = styled.div`
  display: flex;
`;

export const Icon = styled.div`
  margin-right: 7px;
  svg {
    vertical-align: middle;
  }
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  p {
    margin-top: 0px;
  }
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
  hasPosts,
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
      {hasPosts && (
        <td>
          <Group>
            <Icon>
              <CalendarIcon size="medium" />
            </Icon>
            <Text type="p">{campaign.dateRange}</Text>
          </Group>
        </td>
      )}
      <td>
        <Group>
          <Icon>
            <ClockIcon size="medium" />
          </Icon>
          <Text type="p">{campaign.scheduled}</Text>
        </Group>
      </td>
      <td>
        <Group>
          <Icon>
            <ListIcon size="medium" />
          </Icon>
          <Text type="p">{campaign.sent}</Text>
        </Group>
      </td>
      <td>
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
      </td>
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
