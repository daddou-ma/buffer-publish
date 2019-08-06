import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/ui';
import { Row } from '@bufferapp/publish-shared-components';
import { Link } from '@bufferapp/components';
import Modal from '../Modal';

const CloseAccount = ({ showModal, onRequestOpenModal, onRequestCloseModal, onSubmit }) => (
  <Row>
    <div>
      <Text type="h3">Delete your Buffer account</Text>
      <Text type="p">
        <Link href="https://buffer.com/support" newTab>
        Please contact support to delete your account
        </Link>
      </Text>
    </div>

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
