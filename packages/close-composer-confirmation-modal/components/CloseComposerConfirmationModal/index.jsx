import React from 'react';
import PropTypes from 'prop-types';
import { Text, Modal } from '@bufferapp/ui';

import * as Styles from './style';

const CloseComposerConfirmationModal = ({
  translations,
  onCloseComposerAndConfirmationModal,
  onCloseComposerModal,
}) => (
  <Modal
    action={{ label: translations.sure, callback: onCloseComposerAndConfirmationModal }}
    secondaryAction={{ label: translations.cancel, callback: onCloseComposerModal }}
  >
    <Styles.ModalBody>
      <Text type="span">{translations.text}</Text>
    </Styles.ModalBody>
  </Modal>
);

CloseComposerConfirmationModal.propTypes = {
  translations: PropTypes.object.isRequired,
  onCloseComposerAndConfirmationModal: PropTypes.func.isRequired,
  onCloseComposerModal: PropTypes.func.isRequired,
};

export default CloseComposerConfirmationModal;
