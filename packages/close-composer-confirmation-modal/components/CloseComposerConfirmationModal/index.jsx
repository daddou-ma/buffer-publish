import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@bufferapp/ui';

import * as Styles from './style';

const CloseComposerConfirmationModal = ({
  translations,
  onCloseComposerAndConfirmationModal,
  onCloseComposerModal,
}) => (
  <Modal
    action={{
      label: translations.sure,
      callback: onCloseComposerAndConfirmationModal,
    }}
    secondaryAction={{
      label: translations.cancel,
      callback: onCloseComposerModal,
    }}
  >
    <Styles.ModalBody type="p">{translations.text}</Styles.ModalBody>
  </Modal>
);

CloseComposerConfirmationModal.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  onCloseComposerAndConfirmationModal: PropTypes.func.isRequired,
  onCloseComposerModal: PropTypes.func.isRequired,
};

export default CloseComposerConfirmationModal;
