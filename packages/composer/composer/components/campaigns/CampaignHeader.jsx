import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text } from '@bufferapp/ui';
import Select from '@bufferapp/ui/Select';
import Tooltip from '@bufferapp/ui/Tooltip';
import CheckmarkIcon from '@bufferapp/ui/Icon/Icons/Checkmark';
import { gray, white, grayLight } from '@bufferapp/ui/style/colors';
import ChevronDownIcon from '@bufferapp/ui/Icon/Icons/ChevronDown';
import styled from 'styled-components';
import ComposerActionCreators from '../../action-creators/ComposerActionCreators';
import QuestionIcon from '../QuestionIcon';

const SelectWrapper = styled.div`
  display: flex;
  min-width: 275px;
  justify-content: center;
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

const Icon = styled.div`
  display: flex;
  align-items: center;
  margin-left: 9px;
`;

const Separator = styled.div`
  border-top: 1px solid ${grayLight};
  margin: 15px -20px;
`;

const CustomButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  position: relative;
  transition-property: background-color, border-color, color;
  transition-duration: 0.1s;
  transition-timing-function: ease-in;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 0;
  flex: 0 0 auto;
  font-family: 'Roboto', sans-serif;
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 16px;
  padding-left: 16px;
  height: 40px;
  background-color: ${white};
  border: 1px solid ${gray};
  justify-content: space-between;
`;

const Checkmark = styled(CheckmarkIcon)`
  margin-right: 8px;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  p {
    margin-left: 0px;
  }
`;

const CustomLabel = ({ campaign, onClick }) => (
  <CustomButton onClick={onClick}>
    <LabelWrapper>
      {campaign.color && <Color color={campaign.color} />}
      <Text color="grayDarker" type="label">
        {campaign.name}
      </Text>
    </LabelWrapper>
    <ChevronDownIcon />
  </CustomButton>
);

CustomLabel.propTypes = {
  campaign: PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

const IconWrapper = styled.div`
  display: flex;
  min-width: 24px;
`;

const ColorWrapper = styled.div`
  min-width: 18px;
`;

const TextWrapper = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
`;

const getLabel = (campaign, isSelected) => (
  <LabelWrapper title={campaign.name}>
    <IconWrapper>{isSelected && <Checkmark />}</IconWrapper>
    <ColorWrapper>
      {campaign.color && <Color color={campaign.color} />}
    </ColorWrapper>
    <TextWrapper>
      <Text>{campaign.name}</Text>
    </TextWrapper>
  </LabelWrapper>
);

const noCampaign = { id: null, name: 'No Campaign' };

export const getSelected = ({ campaigns, campaignId }) => {
  const selected = campaignId
    ? campaigns.find(campaign => campaign?.id === campaignId)
    : noCampaign;
  return selected || noCampaign;
};

const CampaignHeader = ({ campaigns = [], campaignId = null }) => {
  const hasCampaigns = campaigns?.length > 0;
  const [selected, setSelected] = useState(
    getSelected({ campaigns, campaignId })
  );

  const updateCampaignId = campaign => {
    setSelected(campaign);
    ComposerActionCreators.updateDraftsCampaignId(campaign.id);
  };

  const getCampaignItems = selectedCampaignId => {
    return campaigns.map(campaign => ({
      title: getLabel(campaign, campaign.id === selectedCampaignId),
      selectedItemClick: () => {
        updateCampaignId(campaign);
      },
    }));
  };

  const noCampaignItem = selectedCampaignId => {
    return {
      title: getLabel(noCampaign, noCampaign.id === selectedCampaignId),
      selectedItemClick: () => {
        updateCampaignId(noCampaign);
      },
    };
  };

  useEffect(() => {
    if (!campaignId && hasCampaigns) {
      // select a campaign on default
      updateCampaignId(noCampaign);
    }
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Text>Include in Campaign</Text>
        <Tooltip label="Manage related content across social accounts with a campaign.">
          <Icon>
            <QuestionIcon />
          </Icon>
        </Tooltip>
        <SelectWrapper>
          <Select
            hideSearch
            fullWidth
            type="secondary"
            label={selected.name}
            customButton={onClick => (
              <CustomLabel campaign={selected} onClick={onClick} />
            )}
            disabled={!hasCampaigns}
            onSelectClick={selectedItem => {
              if (typeof selectedItem.selectedItemClick !== 'undefined') {
                selectedItem.selectedItemClick();
              }
              return false;
            }}
            items={[
              noCampaignItem(selected.id),
              ...getCampaignItems(selected.id),
            ]}
          />
        </SelectWrapper>
      </Container>
      <Separator />
    </React.Fragment>
  );
};

CampaignHeader.propTypes = {
  // eslint-disable-next-line react/require-default-props
  campaigns: PropTypes.arrayOf({}),
  // eslint-disable-next-line react/require-default-props
  campaignId: PropTypes.string,
};

export default CampaignHeader;
