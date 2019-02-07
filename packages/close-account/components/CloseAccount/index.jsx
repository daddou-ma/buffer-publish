import React from 'react';
import PropTypes from 'prop-types';
import { Row } from '@bufferapp/publish-shared-components';
import { Text, Button, CloseIcon } from '@bufferapp/components';
import Modal from '../Modal';

const CloseAccount = ({ showModal, onRequestOpenModal, onRequestCloseModal, onSubmit }) => (
  <Row>
    <div
      style={{
        marginRight: '1rem',
      }}
    >
      <Text color={'black'} size={'mini'}>Delete your Buffer account</Text>
      <div
        style={{
          marginTop: '0.5rem',
        }}
      >
        <Text size={'small'}>If you delete your account, you will lose all your posts.</Text>
      </div>
    </div>
    <Button onClick={onRequestOpenModal} noStyle>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            marginRight: '0.5rem',
            marginBottom: '0.25rem',
          }}
        >
          <Text color={'outerSpace'} size={'small'}>Delete Buffer Account</Text>
        </div>
        <div>
          <CloseIcon color={'torchRed'} />
        </div>
      </div>
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
