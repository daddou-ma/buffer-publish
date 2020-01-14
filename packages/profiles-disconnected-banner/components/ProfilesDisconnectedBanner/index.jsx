import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ErrorBanner } from '@bufferapp/publish-shared-components';
import { Text } from '@bufferapp/ui';

const TextWithStyles = styled(Text)`
  margin: 0;
`;

const ProfilesDisconnectedBanner = ({
  id,
  service,
  translations,
  onReconnectProfileClick,
}) => (
  <ErrorBanner
    title={translations.headline}
    content={<TextWithStyles type="p">{translations.body}</TextWithStyles>}
    onClick={() => onReconnectProfileClick({ id, service })}
    actionLabel={translations.cta}
  />
);

ProfilesDisconnectedBanner.propTypes = {
  id: PropTypes.string.isRequired,
  service: PropTypes.string.isRequired,
  translations: PropTypes.shape({
    headline: PropTypes.string,
    body: PropTypes.string,
    cta: PropTypes.string,
  }).isRequired,
  onReconnectProfileClick: PropTypes.func.isRequired,
};

export default ProfilesDisconnectedBanner;
