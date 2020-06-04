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

const DefaultPage = ({
  onConnectSocialAccountClick,
  orgName,
  ownerEmail,
  isAdmin,
}) => {
  const { t } = useTranslation();
  return (
    <Container>
      <EmptyStateWrapper>
        {isAdmin ? (
          <EmptyState
            heroImg="https://buffer-publish.s3.amazonaws.com/images/chart-error.png"
            title={t('default-page.permissionTitle', { name: orgName })}
            subtitle={t('default-page.permissionSubtitle', {
              email: ownerEmail,
            })}
            height="auto"
            link={{
              label: t('default-page.permissionCta'),
              href:
                'https://support.buffer.com/hc/en-us/articles/360038396153-Inviting-users-and-setting-up-permissions',
            }}
          />
        ) : (
          <EmptyState
            heroImg="https://s3.amazonaws.com/buffer-publish/images/no-profiles-hero-img.svg"
            title={t('default-page.defaultTitle')}
            heroImgSize={{ width: '560', height: '284' }}
            height="auto"
            primaryAction={{
              label: t('default-page.connectButton'),
              onClick: onConnectSocialAccountClick,
            }}
          />
        )}
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
  orgName: PropTypes.string,
  ownerEmail: PropTypes.string,
  isAdmin: PropTypes.bool,
};

export default DefaultPage;
