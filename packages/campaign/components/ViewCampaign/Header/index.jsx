import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@bufferapp/ui';
import ArrowRightIcon from '@bufferapp/ui/Icon/Icons/ArrowRight';
import ClockIcon from '@bufferapp/ui/Icon/Icons/Clock';
import ListIcon from '@bufferapp/ui/Icon/Icons/List';
import CalendarIcon from '@bufferapp/ui/Icon/Icons/Calendar';
import {
  ButtonWithSkeleton,
  TextWithSkeleton,
} from '@bufferapp/publish-shared-components';

import {
  ButtonWrapper,
  CampaignDetails,
  Color,
  Container,
  Details,
  Group,
  Icon,
  LastUpdated,
  SubText,
  Title,
  Name,
} from './style';

const Header = ({
  translations,
  campaignDetails,
  hideAnalyzeReport,
  onCreatePostClick,
  onDeleteCampaignClick,
  onEditCampaignClick,
  goToAnalyzeReport,
  isLoading,
}) => (
  <Container>
    <CampaignDetails>
      <Title>
        <Color
          color={campaignDetails.color}
          aria-label="Loading"
          displaySkeleton={isLoading}
        />
        <Name type="h2" aria-label="Loading" displaySkeleton={isLoading}>
          {campaignDetails.name || '________________________________________'}
        </Name>
      </Title>
      {isLoading && (
        <TextWithSkeleton
          type="p"
          aria-label="Loading"
          displaySkeleton={isLoading}
        >
          {'_____________________________________________________________'}
        </TextWithSkeleton>
      )}
      {!isLoading && (
        <SubText>
          <Details>
            {campaignDetails.dateRange && (
              <Group>
                <Icon>
                  <CalendarIcon size="medium" />
                </Icon>
                <Text type="p">{campaignDetails.dateRange}</Text>
              </Group>
            )}
            <Group>
              <Icon>
                <ClockIcon size="medium" />
              </Icon>
              <Text type="p">
                {campaignDetails.scheduled} {translations.scheduled}
              </Text>
            </Group>
            <Group>
              <Icon>
                <ListIcon size="medium" />
              </Icon>
              <Text type="p">
                {campaignDetails.sent} {translations.sent}
              </Text>
            </Group>
          </Details>
          <Text type="p">
            <LastUpdated>{campaignDetails.lastUpdated}</LastUpdated>
          </Text>
        </SubText>
      )}
    </CampaignDetails>
    <ButtonWrapper>
      <ButtonWithSkeleton
        onClick={onCreatePostClick}
        type="secondary"
        isSplit
        label={translations.createPost}
        disabled={isLoading}
        aria-label="Loading"
        displaySkeleton={isLoading}
        onSelectClick={selectedItem => {
          if (typeof selectedItem.selectedItemClick !== 'undefined') {
            selectedItem.selectedItemClick();
          }
          return false;
        }}
        items={[
          {
            title: translations.createPost,
            selectedItemClick: onCreatePostClick,
          },
          {
            title: translations.editCampaign,
            selectedItemClick: () => onEditCampaignClick(campaignDetails.id),
          },
          {
            title: translations.deleteCampaign,
            selectedItemClick: () => {
              onDeleteCampaignClick(campaignDetails);
            },
          },
        ]}
      />
      {!hideAnalyzeReport && (
        <ButtonWithSkeleton
          type="primary"
          icon={<ArrowRightIcon />}
          iconEnd
          onClick={() => {
            goToAnalyzeReport();
          }}
          aria-label="Loading"
          displaySkeleton={isLoading}
          disabled={!campaignDetails.dateRange || isLoading}
          label={translations.viewReport}
        />
      )}
    </ButtonWrapper>
  </Container>
);

Header.propTypes = {
  translations: PropTypes.shape({
    viewReport: PropTypes.string,
    createPost: PropTypes.string,
    editCampaign: PropTypes.string,
    deleteCampaign: PropTypes.string,
    sent: PropTypes.string,
    scheduled: PropTypes.string,
  }).isRequired,
  campaignDetails: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    color: PropTypes.string,
    dateRange: PropTypes.string,
    scheduled: PropTypes.number,
    sent: PropTypes.number,
    lastUpdated: PropTypes.string,
  }).isRequired,
  hideAnalyzeReport: PropTypes.bool.isRequired,
  onCreatePostClick: PropTypes.func.isRequired,
  onDeleteCampaignClick: PropTypes.func.isRequired,
  onEditCampaignClick: PropTypes.func.isRequired,
  goToAnalyzeReport: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

Header.defaultProps = {
  isLoading: false,
};

export default Header;
