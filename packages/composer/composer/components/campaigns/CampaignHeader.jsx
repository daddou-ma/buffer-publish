import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text } from '@bufferapp/ui';
import Select from '@bufferapp/ui/Select';
import Tooltip from '@bufferapp/ui/Tooltip';
import styled from 'styled-components';
import ComposerActionCreators from '../../action-creators/ComposerActionCreators';
import QuestionIcon from '../QuestionIcon';

const SelectWrapper = styled.div`
  display: flex;
  margin-left: auto;
  p {
    margin-left: 0px !important;
  }
  button {
    margin-left: 10px;
  }
`;

const Container = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
`;

const Color = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 10px;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  p {
    margin-left: 0px;
  }
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  margin-left: 9px;
`;

const getLabel = campaign => (
  <LabelWrapper>
    {campaign.color && <Color color={campaign.color} />}
    <Text>{campaign.name}</Text>
  </LabelWrapper>
);

export const getSelected = ({ campaigns, campaignId }) => {
  const selected = campaignId
    ? campaigns.find(campaign => campaign?.id === campaignId)
    : campaigns[0];
  return selected || { name: 'None selected' };
};

const CampaignHeader = ({ campaigns = [], campaignId = null }) => {
  const hasCampaigns = campaigns?.length > 1;
  const [selected, setSelected] = useState(
    getSelected({ campaigns, campaignId })
  );

  const updateCampaignId = campaign => {
    setSelected(campaign);
    if (campaign.id) {
      ComposerActionCreators.updateDraftsCampaignId(campaign.id);
    }
  };

  const getCampaignItems = () => {
    return campaigns.map(campaign => ({
      title: getLabel(campaign),
      selectedItemClick: () => {
        updateCampaignId(campaign);
      },
    }));
  };

  useEffect(() => {
    if (!campaignId && hasCampaigns) {
      // select a campaign on default
      updateCampaignId(selected);
    }
  }, []);

  return (
    <Container>
      <Text>Include in Campaign</Text>
      <Tooltip label="Manage related content across social accounts with a campaign.">
        <Icon>
          <QuestionIcon />
        </Icon>
      </Tooltip>
      <SelectWrapper>
        <Select
          type="secondary"
          label={selected.name}
          icon={hasCampaigns ? <Color color={selected.color} /> : null}
          component={getLabel(selected)}
          disabled={!hasCampaigns}
          onSelectClick={selectedItem => {
            if (typeof selectedItem.selectedItemClick !== 'undefined') {
              selectedItem.selectedItemClick();
            }
            return false;
          }}
          items={[...getCampaignItems()]}
        />
      </SelectWrapper>
    </Container>
  );
};

CampaignHeader.propTypes = {
  // eslint-disable-next-line react/require-default-props
  campaigns: PropTypes.arrayOf({}),
  // eslint-disable-next-line react/require-default-props
  campaignId: PropTypes.string,
};

export default CampaignHeader;
