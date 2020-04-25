import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../shared-components/modal/modal';
import ModalActionCreators from '../shared-components/modal/actionCreators.js';
import AppActionCreators from '../action-creators/AppActionCreators';
import Button from '../components/styled/Button';
import styles from './css/EmptyTextAlert.css';

class EmptyTextAlert extends React.Component {
  static propTypes = {
    queueingType: PropTypes.string.isRequired,
  };

  onClickCancel = () => {
    ModalActionCreators.closeModal();
  };

  onClickSendAndRemember = () => {
    ModalActionCreators.closeModal();
    AppActionCreators.rememberModalView('remember_confirm_saving_modal');
    AppActionCreators.saveDrafts(this.props.queueingType);
  };

  onClickSend = () => {
    ModalActionCreators.closeModal();
    AppActionCreators.saveDrafts(this.props.queueingType);
  };

  render() {
    return (
      <Modal classNames={{ modal: styles.modalStyles }}>
        <h2 className={styles.title}>Send update?</h2>
        <p>Looks like you're posting an update to Facebook without any text.</p>
        <p>Keen to post this to Facebook anyway?</p>
        <div className={styles.buttonsContainer}>
          <Button className={styles.cancelButton} onClick={this.onClickCancel}>
            Cancel
          </Button>
          <Button
            className={styles.sendAndRemember}
            onClick={this.onClickSendAndRemember}
          >
            Send and don't ask again
          </Button>
          <Button className={styles.sendButton} onClick={this.onClickSend}>
            Send
          </Button>
        </div>
      </Modal>
    );
  }
}

export default EmptyTextAlert;
