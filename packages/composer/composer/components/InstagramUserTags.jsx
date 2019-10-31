import React from 'react';
import PropTypes from 'prop-types';
import UserTags from '@bufferapp/publish-composer-user-tags';

import Modal from '../shared-components/modal/modal';
import ModalActionCreators from '../shared-components/modal/actionCreators';
import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import style from './css/InstagramUserTags.css';
import AppStore from '../stores/AppStore';

const InstagramUserTags = ({ media, draftId, userTags = [] }) => {
  const modalClassNames = {
    modal: style.modal,
  };
  const selectedIgProfiles = AppStore.getSelectedProfilesForService(
    'instagram'
  );
  const saveGlobalTags = tags => {
    ComposerActionCreators.updateDraftImageUserTags(draftId, tags);
    ModalActionCreators.closeModal();
  };

  const onCancel = () => ModalActionCreators.closeModal();

  return (
    <Modal
      classNames={modalClassNames}
      hideCloseButton
      preventCloseOnOverlayClick
    >
      <UserTags
        media={media}
        userTags={userTags}
        saveGlobalTags={saveGlobalTags}
        onCancel={onCancel}
        selectedChannels={selectedIgProfiles}
      />
    </Modal>
  );
};

InstagramUserTags.propTypes = {
  media: PropTypes.shape({
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  draftId: PropTypes.string.isRequired,
  userTags: PropTypes.arrayOf({
    userName: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

InstagramUserTags.defaultProps = {
  userTags: [],
};

export default InstagramUserTags;
