import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AnimatedList } from '@bufferapp/publish-shared-components';
import ListItem from '../ListItem';

const StyledList = styled(AnimatedList)`
  padding-left: 0px;
  width: 100%;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const skeletonCampaign = {
  color: null,
  id: null,
  name: 'Loading Name',
  sent: 0,
  scheduled: 0,
  lastUpdated: 'Loading date',
  dateRange: null,
};

const SkeletonList = ({ translations, hideAnalyzeReport }) => (
  <StyledList numberItems={3}>
    <ListItem
      key="1"
      translations={translations}
      campaign={skeletonCampaign}
      hideAnalyzeReport={hideAnalyzeReport}
      displaySkeleton
    />
    <ListItem
      key="2"
      translations={translations}
      campaign={skeletonCampaign}
      hideAnalyzeReport={hideAnalyzeReport}
      displaySkeleton
    />
    <ListItem
      key="3"
      translations={translations}
      campaign={skeletonCampaign}
      hideAnalyzeReport={hideAnalyzeReport}
      displaySkeleton
    />
  </StyledList>
);

SkeletonList.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  hideAnalyzeReport: PropTypes.bool.isRequired,
};

export default SkeletonList;
