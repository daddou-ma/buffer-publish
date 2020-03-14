import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Text } from '@bufferapp/ui';
import styled from 'styled-components';
import { grayDark } from '@bufferapp/ui/style/colors';
import { fontWeightMedium } from '@bufferapp/components/style/font';

const Container = styled.div`
  margin: 0 16px;
  p {
    color: ${grayDark};
  }
`;

const Bold = styled.span`
  p {
    font-weight: ${fontWeightMedium};
  }
`;

const DeleteCampaignModal = ({
  translations,
  deleteCampaign,
  hideModal,
  username,
  campaignId,
  loading,
}) => (
  <Modal
    action={{
      label: loading ? translations.loading : translations.delete,
      disabled: false,
      callback: () => {
        deleteCampaign(campaignId);
      },
    }}
    secondaryAction={{
      label: translations.cancel,
      callback: () => {
        hideModal();
      },
    }}
    dismissable
  >
    <Container>
      <Text type="h2">{`${translations.title} ${username}?`}</Text>
      <div>
        <Bold>
          <Text type="p" color={grayDark}>
            {translations.boldSubtext}
          </Text>
        </Bold>
        <Text type="p" color={grayDark}>
          {translations.subtext}
        </Text>
      </div>
    </Container>
  </Modal>
);

DeleteCampaignModal.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  deleteCampaign: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  campaignId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default DeleteCampaignModal;
