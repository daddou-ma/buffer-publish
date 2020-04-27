import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, Button, Link } from '@bufferapp/ui';
import { gray } from '@bufferapp/ui/style/colors';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid ${gray};
  border-radius: 4px;
  padding: 28px 20px;
  background-image: url('https://s3.amazonaws.com/buffer-publish/images/campaigns-yellow-background.svg'),
    url('https://s3.amazonaws.com/buffer-publish/images/camapigns-green-background.svg');
  background-position: right bottom, left top;
  background-repeat: no-repeat, no-repeat;
`;

const SubText = styled.div`
  max-width: 400px;
  p {
    margin: 0px 0px 24px;
    text-align: center;
  }
`;

const LinkWithStyles = styled(Link)`
  display: inline-block;
  padding: 16px;
`;

const EmptyCampaignBanner = ({ onCreatePostClick }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Text type="h1">
        {t('campaigns.viewCampaign.emptyCampaignBanner.title')}
      </Text>
      <SubText>
        <Text type="p">
          {t('campaigns.viewCampaign.emptyCampaignBanner.subtext')}
        </Text>
      </SubText>
      <Button
        onClick={onCreatePostClick}
        type="primary"
        label={t('campaigns.viewCampaign.emptyCampaignBanner.createPosts')}
      />
      <LinkWithStyles
        href="https://support.buffer.com/hc/en-us/articles/360046266313-creating-and-managing-campaigns"
        newTab
      >
        {t('campaigns.viewCampaign.emptyCampaignBanner.learnMore')}
      </LinkWithStyles>
    </Container>
  );
};

EmptyCampaignBanner.propTypes = {
  onCreatePostClick: PropTypes.func.isRequired,
};

export default EmptyCampaignBanner;
