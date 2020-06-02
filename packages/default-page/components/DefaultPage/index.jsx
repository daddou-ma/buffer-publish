import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { EmptyState } from '@bufferapp/publish-shared-components';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;
`;

const EmptyStateWrapper = styled.div`
  padding: 1rem;
  text-align: center;
  flex: 1;
  margin-top: 10vh;
`;

const DefaultPage = ({ onConnectSocialAccountClick, translations }) => {
  const { t } = useTranslation();
  return (
    <Container>
      <EmptyStateWrapper>
        <EmptyState
          heroImg="https://s3.amazonaws.com/buffer-publish/images/no-profiles-hero-img.svg"
          title={translations.defaultTitle}
          heroImgSize={{ width: '560', height: '284' }}
          height="auto"
          primaryAction={{
            label: t('default-page.connectButton'),
            onClick: onConnectSocialAccountClick,
          }}
        />
      </EmptyStateWrapper>
    </Container>
  );
};

DefaultPage.propTypes = {
  onConnectSocialAccountClick: PropTypes.func.isRequired,
  translations: PropTypes.shape({
    connectButton: PropTypes.string,
    defaultTitle: PropTypes.string,
  }).isRequired,
};

export default DefaultPage;
