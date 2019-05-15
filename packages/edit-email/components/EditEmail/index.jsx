import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from '@bufferapp/ui';
import { Row } from '@bufferapp/publish-shared-components';
import Modal from '../Modal';

const editStyle = {
  marginLeft: '0.5rem',
};

const EditEmail = ({ email, onClick, displayModal, updateEmail, saveEmail, hideModal }) => (
  <Row>
    <Text type="h3">Email and Password</Text>
    <section>
      <span style={editStyle}>
        <Button
          label="Edit"
          onClick={() => window.location.assign('https://account.buffer.com?redirect=https%3A%2F%2Fpublish.buffer.com')}
        />
      </span>
    </section>
    {displayModal && (
      <Modal email={email} updateEmail={updateEmail} hideModal={hideModal} saveEmail={saveEmail} />
    )}
  </Row>
);

EditEmail.propTypes = {
  email: PropTypes.string.isRequired,
  saveEmail: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  displayModal: PropTypes.bool,
};

EditEmail.defaultProps = {
  displayModal: false,
};

export default EditEmail;
