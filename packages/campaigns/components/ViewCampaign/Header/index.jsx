import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, Button } from '@bufferapp/ui';
import { grayDark } from '@bufferapp/ui/style/colors';

import ArrowRightIcon from '@bufferapp/ui/Icon/Icons/ArrowRight';
import ClockIcon from '@bufferapp/ui/Icon/Icons/Clock';
import ListIcon from '@bufferapp/ui/Icon/Icons/List';

const Container = styled.div`
  display: flex;
  margin: 14px 0px 30px;
`;

const Color = styled.div`
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 10px;
`;

const LastUpdated = styled.span`
  color: ${grayDark};
`;

const SubText = styled.div`
  display: flex;
  margin-top: 8px;
  p {
    margin: 0px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-left: auto;
  margin-top: 10px;
  button {
    margin-left: 10px;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  h1 {
    margin: 0px;
  }
`;

const CampaignDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Group = styled.div`
  display: flex;
  margin-right: 16px;
`;

const Details = styled.div`
  display: flex;
`;

const Icon = styled.div`
  margin-right: 7px;
  svg {
    vertical-align: middle;
  }
`;

const Header = ({ translations, campaignDetails, hasPosts }) => (
  <Container>
    <CampaignDetails>
      <Title>
        <Color color={campaignDetails.color} />
        <Text type="h1">{campaignDetails.name}</Text>
      </Title>
      <SubText>
        {hasPosts && (
          <Details>
            <Group>
              <Icon>
                <ClockIcon size="medium" />
              </Icon>
              <Text type="p">{campaignDetails.dateRange}</Text>
            </Group>
            <Group>
              <Icon>
                <ClockIcon size="medium" />
              </Icon>
              <Text type="p">{campaignDetails.scheduled}</Text>
            </Group>
            <Group>
              <Icon>
                <ListIcon size="medium" />
              </Icon>
              <Text type="p">{campaignDetails.sent}</Text>
            </Group>
          </Details>
        )}
        <Text type="p">
          <LastUpdated>{campaignDetails.lastUpdated}</LastUpdated>
        </Text>
      </SubText>
    </CampaignDetails>
    <ButtonWrapper>
      <Button
        onSelectClick={() => true}
        onClick={() => true}
        type="secondary"
        isSplit
        items={[
          { id: '1', title: 'Creat Post' },
          { id: '2', title: 'Edit Campaign' },
          { id: '3', title: 'Delete Campaign' },
        ]}
        label={translations.createPost}
      />
      <Button
        type="secondary"
        icon={<ArrowRightIcon />}
        iconEnd
        onClick={() => {}}
        disabled={!hasPosts}
        label={translations.viewReport}
      />
    </ButtonWrapper>
  </Container>
);

Header.propTypes = {
  translations: PropTypes.shape({
    viewReport: PropTypes.string,
    createPost: PropTypes.string,
  }).isRequired,
  campaignDetails: PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string,
    dateRange: PropTypes.string,
    scheduled: PropTypes.string,
    sent: PropTypes.string,
    lastUpdated: PropTypes.string,
  }).isRequired,
  hasPosts: PropTypes.string.isRequired,
};

export default Header;
