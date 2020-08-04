import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ErrorBanner } from '@bufferapp/publish-shared-components';
import { Text } from '@bufferapp/ui';
import { fontWeightBold } from '@bufferapp/ui/style/fonts';

const TextWithStyles = styled(Text)`
  margin: 0;
`;

const ExtraMessageWithStyles = styled(Text)`
  margin: 0;
  font-weight: ${fontWeightBold};
`;

const ProfilesDisconnectedBanner = ({
  profileId,
  service,
  onReconnectProfileClick,
  displayExtraMessage,
  canReconnectChannels,
  ownerEmail,
}) => {
  const { t } = useTranslation();
  return (
    <ErrorBanner
      title={t('profiles-disconnected-banner.headline')}
      onClick={() => onReconnectProfileClick({ id: profileId, service })}
      actionLabel={
        canReconnectChannels ? t('profiles-disconnected-banner.cta') : null
      }
    >
      {displayExtraMessage && (
        <ExtraMessageWithStyles type="p">
          {t('profiles-disconnected-banner.extraMessage?.instagram')}
        </ExtraMessageWithStyles>
      )}
      <TextWithStyles type="p">
        {canReconnectChannels
          ? t('profiles-disconnected-banner.body')
          : t('profiles-disconnected-banner.permissionBody', {
              email: ownerEmail,
            })}
      </TextWithStyles>
    </ErrorBanner>
  );
};

ProfilesDisconnectedBanner.propTypes = {
  canReconnectChannels: PropTypes.bool,
  profileId: PropTypes.string.isRequired,
  service: PropTypes.string.isRequired,
  displayExtraMessage: PropTypes.bool,
  onReconnectProfileClick: PropTypes.func.isRequired,
  ownerEmail: PropTypes.string,
};

ProfilesDisconnectedBanner.defaultProps = {
  displayExtraMessage: false,
  canReconnectChannels: true,
  ownerEmail: 'the owner',
};

export default ProfilesDisconnectedBanner;
