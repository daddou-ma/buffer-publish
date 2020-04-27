import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CloseButton from './shared/CloseButton';
import styles from './css/App.css';
import { isOnExtension } from '../utils/extension';

const ExtensionComponents = ({
  draggingAnchorRef,
  onCloseButtonClick,
  metadata,
}) =>
  isOnExtension(metadata) ? (
    <Fragment>
      <span
        className={['bi bi-drag', styles.draggingAnchor].join(' ')}
        ref={draggingAnchorRef}
      />
      <CloseButton
        className={['bi bi-x', styles.closeButton].join(' ')}
        onClick={onCloseButtonClick}
      />
    </Fragment>
  ) : null;

ExtensionComponents.propTypes = {
  draggingAnchorRef: PropTypes.func.isRequired,
  onCloseButtonClick: PropTypes.func.isRequired,
  metadata: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default ExtensionComponents;
