import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, Button, Link } from '@bufferapp/ui';
import { gray } from '@bufferapp/ui/style/colors';
import { useTranslation } from 'react-i18next';

const Card = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${gray};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-right: 0;
  padding: 24px 32px;
  align-items: end;
`;

const Title = styled(Text)`
  margin: 0 0 8px;
`;

const ButtonWithStyles = styled(Button)`
  margin-top: 16px;
`;

const ImageWithStyles = styled.img`
  width: 100%;
  max-width: 250px;
  height: auto;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const TextWithStyles = styled(Text)`
  margin: 0;
`;

const IGPersonalProfileNotification = ({
  onDirectPostingClick,
  profileId,
  tabId,
}) => {
  const { t } = useTranslation();
  return (
    <Card>
      <ContentWrapper>
        <Title type="h3">
          {t('instagram-personal-profile-notification.title')}
        </Title>
        <TextWithStyles type="p">
          {t('instagram-personal-profile-notification.body')}
          <Link
            href="https://support.buffer.com/hc/en-us/articles/360052978413-Deprecating-Instagram-Personal-Profiles"
            newTab
          >
            {' '}
            {t('instagram-personal-profile-notification.linkText')}
          </Link>
        </TextWithStyles>
        <ButtonWithStyles
          type="primary"
          onClick={() => onDirectPostingClick({ profileId, tabId })}
          label={t('instagram-personal-profile-notification.buttonLabel')}
        />
      </ContentWrapper>
      <ImageWithStyles
        alt={t('instagram-personal-profile-notification.altText')}
        src="https://buffer-publish.s3.amazonaws.com/images/ig-measure.png"
      />
    </Card>
  );
};

IGPersonalProfileNotification.propTypes = {
  onDirectPostingClick: PropTypes.func.isRequired,
  profileId: PropTypes.string.isRequired,
  tabId: PropTypes.string.isRequired,
};

export default IGPersonalProfileNotification;
