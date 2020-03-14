import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Text } from '@bufferapp/ui';
import styled from 'styled-components';
import { grayDark } from '@bufferapp/ui/style/colors';
import { fontWeightSemiBold } from '@bufferapp/components/style/font';

const Container = styled.div`
  margin: 0 16px;
  p {
    color: ${grayDark};
    display: inline;
  }
`;

const BoldText = styled(Text)`
  font-weight: ${fontWeightSemiBold};
`;

const DeleteCampaignModal = ({
  translations,
  deleteCampaign,
  hideModal,
  username,
  loading,
}) => (
  <Modal
    action={{
      label: loading ? translations.loading : translations.delete,
      disabled: false,
      callback: () => {
        deleteCampaign();
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
      <Text type="h2">{`${translations.title} "${username}"?`}</Text>
      <BoldText type="p">{translations.boldSubtext}</BoldText>
      <Text type="p">{translations.subtext}</Text>
    </Container>
  </Modal>
);

DeleteCampaignModal.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  deleteCampaign: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default DeleteCampaignModal;
