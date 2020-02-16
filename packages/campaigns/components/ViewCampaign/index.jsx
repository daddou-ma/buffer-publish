import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from './Header';
import EmptyState from './EmptyState';
import ExamplePost from './ExamplePost';

const Container = styled.div`
  margin: 18px;
`;

const ViewCampaign = ({ campaignDetails, hasPosts, translations }) => (
  <Container>
    <Header
      campaignDetails={campaignDetails}
      hasPosts={hasPosts}
      translations={translations.viewCampaign}
    />
    <EmptyState translations={translations.viewCampaign} />
    <ExamplePost />
    <ExamplePost />
  </Container>
);

ViewCampaign.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  campaignDetails: PropTypes.object.isRequired, // eslint-disable-line
  hasPosts: PropTypes.string.isRequired,
};

export default ViewCampaign;
