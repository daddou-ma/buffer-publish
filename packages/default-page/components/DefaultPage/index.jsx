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
  orgName,
  ownerEmail,
  showPermissionsEmptyPage,
  connectURL,
}) => {
  const { t } = useTranslation();
  return (
    <Container>
      <EmptyStateWrapper>
        {showPermissionsEmptyPage ? (
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
              onClick: () => {
                window.location.assign(connectURL);
              },
            }}
          />
        )}
      </EmptyStateWrapper>
    </Container>
  );
};

DefaultPage.propTypes = {
  orgName: PropTypes.string,
  ownerEmail: PropTypes.string,
  showPermissionsEmptyPage: PropTypes.bool,
  connectURL: PropTypes.string.isRequired,
};

DefaultPage.defaultProps = {
  orgName: '',
  ownerEmail: '',
  showPermissionsEmptyPage: false,
};

export default DefaultPage;
