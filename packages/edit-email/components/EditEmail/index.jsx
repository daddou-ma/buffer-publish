import React from 'react';
import PropTypes from 'prop-types';
import { Text, Link } from '@bufferapp/components';
import {
  Row,
  SensitiveData,
} from '@bufferapp/publish-shared-components';

import Modal from '../Modal';

const editStyle = {
  marginLeft: '1rem',
};

const EditEmail = ({ email, onClick, displayModal, updateEmail, saveEmail, hideModal }) => (
  <Row>
    <Text color={'black'} size={'mini'}>Email address</Text>
    <section>
      <SensitiveData>
        <Text size={'small'} color={'outerSpace'}>{email}</Text>
      </SensitiveData>
      <span style={editStyle}>
        <Text size={'small'}>
          <Link onClick={onClick} unstyled href="#">
            Edit
          </Link>
        </Text>
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
