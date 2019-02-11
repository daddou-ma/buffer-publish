import React from 'react';
import PropTypes from 'prop-types';
import { Row } from '@bufferapp/publish-shared-components';
import { Text, Button } from '@bufferapp/components';
import Modal from '../Modal';

const CloseAccount = ({ showModal, onRequestOpenModal, onRequestCloseModal, onSubmit }) => (
  <Row>
    <div>
      <Text color={'black'} size={'mini'}>Delete your Buffer account</Text>
      <div>
        <Text size={'mini'}>If you delete your account, you will lose all your posts.</Text>
      </div>
    </div>
    <Button onClick={onRequestOpenModal} noStyle>
      <Text color={'outerSpace'} size={'mini'}>Delete Account</Text>
    </Button>
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
