import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../__legacy-buffer-web-shared-components__/modal/modal';
import ModalActionCreators from '../__legacy-buffer-web-shared-components__/modal/actionCreators';
import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import UserTags from '../../../composer-user-tags';

const InstagramUserTags = ({ media, draftId, userTags = [] }) => {
  const saveGlobalTags = tags => {
    ComposerActionCreators.updateDraftUserTags(draftId, tags);
    ModalActionCreators.closeModal();
  };
  return (
    <Modal hideCloseButton>
      <UserTags
        media={media}
        userTags={userTags}
        saveGlobalTags={saveGlobalTags}
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
