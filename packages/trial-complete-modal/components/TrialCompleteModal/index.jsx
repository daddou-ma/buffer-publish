import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { stringTokenizer } from '@bufferapp/publish-i18n';
import { Text, Modal } from '@bufferapp/ui';

const TextWithStyle = styled(Text)`
  margin: 90px 12px 20px;
  align-self: baseline;
`;

const TrialCompleteModal = ({
  translations,
  hasExpiredProTrial,
  hasExpiredBusinessTrial,
  isPremiumBusiness,
  cancelTrial,
  completeAndUpgrade,
}) => {
  const currentTrial = () => {
    if (hasExpiredProTrial) return 'Pro';
    if (hasExpiredBusinessTrial) {
      if (isPremiumBusiness) {
        return 'Premium';
      }
      return 'Business';
    }
  };

  const titleMessage = stringTokenizer(
    translations.header,
    '{plan}',
    currentTrial()
  );

  return (
    <Modal
      background="url('https://s3.amazonaws.com/buffer-publish/images/b4b-welcome-modal-background.svg') no-repeat"
      action={{
        label: translations.completeAndUpgrade,
        callback: () => {
          completeAndUpgrade();
        },
      }}
      secondaryAction={{
        label: translations.cancelTrial,
        callback: () => {
          cancelTrial();
        },
      }}
    >
      <TextWithStyle type="h2">{titleMessage}</TextWithStyle>
    </Modal>
  );
};

TrialCompleteModal.propTypes = {
  hasExpiredProTrial: PropTypes.bool.isRequired,
  hasExpiredBusinessTrial: PropTypes.bool.isRequired,
  isPremiumBusiness: PropTypes.bool.isRequired,
  translations: PropTypes.object.isRequired, // eslint-disable-line
  cancelTrial: PropTypes.func.isRequired,
  completeAndUpgrade: PropTypes.func.isRequired,
};

export default TrialCompleteModal;
