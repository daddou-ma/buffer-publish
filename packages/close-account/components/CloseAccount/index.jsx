import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/ui';
import { Row } from '@bufferapp/publish-shared-components';
import Modal from '../Modal';

const CloseAccount = ({ showModal, onRequestOpenModal, onRequestCloseModal, onSubmit }) => (
  <Row>
    <div>
      <Text type="h3">Request to delete my Buffer account</Text>
      <Text type="p">If you delete your account, you will lose all your posts.</Text>
    </div>
    <Button
      type="text"
      onClick={() => onRequestOpenModal()}
      label="Delete Account"
    />
    {showModal ? <Modal onRequestCloseModal={onRequestCloseModal} onSubmit={onSubmit} /> : null}
  </Row>
);

CloseAccount.propTypes = {
  showModal: PropTypes.bool,
  onRequestCloseModal: PropTypes.func.isRequired,
  onRequestOpenModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

CloseAccount.defaultProps = {
  showModal: false,
};

export default CloseAccount;
